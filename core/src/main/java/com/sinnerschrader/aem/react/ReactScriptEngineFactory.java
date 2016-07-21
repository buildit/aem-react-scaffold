package com.sinnerschrader.aem.react;

import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.URL;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import javax.script.ScriptEngine;
import javax.script.ScriptEngineFactory;

import org.apache.commons.pool2.ObjectPool;
import org.apache.commons.pool2.impl.GenericObjectPool;
import org.apache.commons.pool2.impl.GenericObjectPoolConfig;
import org.apache.felix.scr.annotations.Activate;
import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Deactivate;
import org.apache.felix.scr.annotations.Modified;
import org.apache.felix.scr.annotations.Properties;
import org.apache.felix.scr.annotations.Property;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.servlets.ServletResolver;
import org.apache.sling.commons.classloader.DynamicClassLoaderManager;
import org.apache.sling.commons.osgi.PropertiesUtil;
import org.apache.sling.scripting.api.AbstractScriptEngineFactory;
import org.osgi.service.component.ComponentContext;

import com.sinnerschrader.aem.react.exception.TechnicalException;
import com.sinnerschrader.aem.react.loader.ScriptCollectionLoader;
import com.sinnerschrader.aem.react.loader.ScriptLoader;

@Component(label = "HLAG-Web ReactJs Script Engine Factory", metatype = true)
@Service(ScriptEngineFactory.class)
@Properties({ @Property(name = "service.description", value = "Reactjs Templating Engine"),//
    @Property(name = "compatible.javax.script.name", value = "jsx"),// TODO also use it for extension and other props.
    @Property(name = ReactScriptEngineFactory.PROPERTY_SCRIPTS_PATHS, label="the jcr paths to the scripts libraries"),//
    @Property(name = ReactScriptEngineFactory.PROPERTY_POOL_TOTAL_SIZE, label="total javascript engine pool size", longValue = 20),//
    @Property(name = ReactScriptEngineFactory.PROPERTY_SCRIPTS_RELOAD, label="reload library scripts before each rendering", boolValue = false),//
})
public class ReactScriptEngineFactory extends AbstractScriptEngineFactory {

  public static final String PROPERTY_SCRIPTS_PATHS = "scripts.paths";
  public static final String PROPERTY_SUBSERVICENAME = "subServiceName";
  public static final String PROPERTY_POOL_TOTAL_SIZE = "pool.total.size";
  public static final String PROPERTY_SCRIPTS_RELOAD = "scripts.reload";

  @Reference
  private ServletResolver servletResolver;

  @Reference
  private DynamicClassLoaderManager dynamicClassLoaderManager;

  @Reference
  private ScriptLoader scriptLoader;

  private static final String NASHORN_POLYFILL_JS = "nashorn-polyfill.js";

  private ClassLoader dynamicClassLoader;

  private ReactScriptEngine engine;


  protected ScriptCollectionLoader createLoader(final String[] scriptResources) {
    // we need to add the nashorn polyfill for console, global and AemGlobal
    String polyFillName = this.getClass().getPackage().getName().replace(".", "/") + "/" + NASHORN_POLYFILL_JS;

    URL polyFillUrl = this.dynamicClassLoader.getResource(polyFillName);
    if (polyFillUrl == null) {
      throw new TechnicalException("cannot find initial script " + polyFillName);
    }

    return new ScriptCollectionLoader() {

      @Override
      public Iterator<Reader> iterator() {
        List<Reader> readers = new ArrayList<Reader>();
        try {
          readers.add(new InputStreamReader(polyFillUrl.openStream(), "UTF-8"));
        } catch (IOException e) {
          throw new TechnicalException("cannot open stream to " + polyFillUrl, e);
        }
        for (String scriptResource : scriptResources) {
          readers.add(scriptLoader.loadJcrScript(scriptResource));
        }
        return readers.iterator();
      }
    };

  }

  public ReactScriptEngineFactory() {
    super();
    setNames("reactjs");
    setExtensions("jsx");
  }

  @Override
  public String getLanguageName() {
    return "jsx";
  }

  @Override
  public String getLanguageVersion() {
    return "1.0.0";
  }

  protected boolean isReloadScripts(final ComponentContext context) {
    return PropertiesUtil.toBoolean(context.getProperties().get(PROPERTY_SCRIPTS_RELOAD), false);

  }

  @Activate
  public void initialize(final ComponentContext context) {
    String[] scriptResources = PropertiesUtil.toStringArray(context.getProperties().get(PROPERTY_SCRIPTS_PATHS), new String[0]);
    int poolTotalSize = PropertiesUtil.toInteger(context.getProperties().get(PROPERTY_POOL_TOTAL_SIZE), 20);
    JavacriptEnginePoolFactory javacriptEnginePoolFactory = new JavacriptEnginePoolFactory(createLoader(scriptResources));
    ObjectPool<JavascriptEngine> pool = createPool(poolTotalSize, javacriptEnginePoolFactory);
    this.engine = new ReactScriptEngine(this, pool, isReloadScripts(context));
  }
  
  
  @Modified
  public void reconfigure(final ComponentContext context) {
    stop();
    initialize(context);
  }

  @Deactivate
  public void stop() {
    this.engine.stop();
  }

  protected ObjectPool<JavascriptEngine> createPool(int poolTotalSize, JavacriptEnginePoolFactory javacriptEnginePoolFactory) {
    GenericObjectPoolConfig config = new GenericObjectPoolConfig();
    config.setMaxTotal(poolTotalSize);
    return new GenericObjectPool<JavascriptEngine>(javacriptEnginePoolFactory, config);
  }

  @Override
  public ScriptEngine getScriptEngine() {
    return engine;
  }

  protected void bindDynamicClassLoaderManager(final DynamicClassLoaderManager dclm) {
    if (this.dynamicClassLoader != null) {
      this.dynamicClassLoader = null;
      this.dynamicClassLoaderManager = null;
    }
    this.dynamicClassLoaderManager = dclm;
    dynamicClassLoader = dclm.getDynamicClassLoader();
  }

  protected void unbindDynamicClassLoaderManager(final DynamicClassLoaderManager dclm) {
    if (this.dynamicClassLoaderManager == dclm) {
      this.dynamicClassLoader = null;
      this.dynamicClassLoaderManager = null;
    }
  }

  protected ClassLoader getClassLoader() {
    return dynamicClassLoader;
  }

}
