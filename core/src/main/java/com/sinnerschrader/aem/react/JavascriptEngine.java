package com.sinnerschrader.aem.react;

import java.io.IOException;
import java.io.Reader;
import java.io.Writer;
import java.util.Iterator;

import javax.script.Bindings;
import javax.script.Invocable;
import javax.script.ScriptEngine;
import javax.script.ScriptEngineManager;
import javax.script.ScriptException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.sinnerschrader.aem.react.exception.TechnicalException;
import com.sinnerschrader.aem.react.loader.ScriptCollectionLoader;

/**
 *
 * This Javascript engine can render ReactJs component in nashorn.
 *
 * @author stemey
 *
 */
public class JavascriptEngine {
  private ScriptCollectionLoader loader;
  private ScriptEngine engine;

  private static final Logger LOGGER = LoggerFactory.getLogger(JavascriptEngine.class);

  public static class Console {
    public void debug(String statement) {
      LOGGER.debug(statement);
    }

    public void debug(String statement, Object error) {
      LOGGER.debug(statement, error);
    }

    public void log(String statement) {
      LOGGER.info(statement);
    }

    public void log(String statement, Object error) {
      LOGGER.info(statement, error);
    }

    public void info(String statement) {
      LOGGER.info(statement);
    }

    public void info(String statement, Object error) {
      LOGGER.info(statement, error);
    }

    public void error(String statement) {
      LOGGER.error(statement);
    }

    public void error(String statement, Object error) {
      LOGGER.error(statement, error);
    }

    public void warn(String statement) {
      LOGGER.warn(statement);
    }

    public void warn(String statement, Object error) {
      LOGGER.warn(statement, error);
    }

  }

  public static class Print extends Writer {
    @Override
    public void write(char[] cbuf, int off, int len) throws IOException {
      LOGGER.error(new String(cbuf, off, len));
    }

    @Override
    public void flush() throws IOException {

    }

    @Override
    public void close() throws IOException {

    }
  }

  /**
   * initialize the nashorn engine and install the default scripts.
   *
   * @param loader
   */
  public void initialize(ScriptCollectionLoader loader) {
    ScriptEngineManager scriptEngineManager = new ScriptEngineManager(null);
    engine = scriptEngineManager.getEngineByName("nashorn");
    engine.getContext().setErrorWriter(new Print());
    engine.getContext().setWriter(new Print());
    engine.put("console", new Console());
    this.loader = loader;
    updateJavascriptLibrary();
  }

  private void updateJavascriptLibrary() {

    Iterator<Reader> iterator = loader.iterator();
    while (iterator.hasNext()) {
      try {
        engine.eval(iterator.next());
      } catch (ScriptException e) {
        throw new TechnicalException("cannot eval library script", e);
      }
    }

  }

  /**
   * render the given react component. This will invoke
   *
   * <pre>
   * <code>AemGlobal.renderReactComponent(component,json) </code>
   * </pre>
   *
   * in the javascript context.
   *
   * @param component
   *          Name of the react component
   * @param json
   *          the props of the react component
   * @return the rendered html
   */
  public String render(String component, String json) {

    Invocable invocable = ((Invocable) engine);
    try {
      Object JSON = engine.get("JSON");
      Object props = invocable.invokeMethod(JSON, "parse", json);
      Object AemGlobal = engine.get("AemGlobal");
      return (String) invocable.invokeMethod(AemGlobal, "renderReactComponent", component, props);
    } catch (NoSuchMethodException | ScriptException e) {
      throw new TechnicalException("cannot render react on server", e);
    }
  }

  public boolean isReactComponent(String resourceType) {
    Invocable invocable = ((Invocable) engine);
    try {
      Bindings AemGlobal = (Bindings) engine.get("AemGlobal");
      Object component = invocable.invokeMethod(AemGlobal.get("registry"), "getComponent", resourceType);
      return component != null;
    } catch (NoSuchMethodException | ScriptException e) {
      throw new TechnicalException("cannot render react on server", e);
    }
  }

  public ScriptEngine getEngine() {
    return engine;
  }

  /**
   * reload scripts and initialize. Call this during development before
   * rendering.
   */
  public void reloadScripts() {
    updateJavascriptLibrary();
  }

}
