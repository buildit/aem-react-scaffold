package com.sinnerschrader.aem.react.loader;

import java.io.Reader;
import java.util.Iterator;

/**
 * This loader returns all scripts that should be installed in the script
 * context.
 * 
 * @author stemey
 *
 */
public interface ScriptCollectionLoader {
  public Iterator<Reader> iterator();
}
