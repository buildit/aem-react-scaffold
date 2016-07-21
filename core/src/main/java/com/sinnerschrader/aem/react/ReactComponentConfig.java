package com.sinnerschrader.aem.react;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * This is the configuration of an aem component.
 *
 * @author stemey
 *
 */
public class ReactComponentConfig {

  @JsonProperty
  private int depth = 1;
  @JsonProperty
  private boolean postRender = true;

  private boolean reload;

  private String component;

  /**
   * The components props is the jcr node.
   *
   * @return the depth determines the number of levels in the jcr node tree and
   *         convert to json.
   */
  public int getDepth() {
    return depth;
  }

  /**
   *
   * @return name of the react component
   */
  public String getComponent() {
    return component;
  }

  /**
   *
   * @return true if the component includes resources and needs to be
   *         postprocessed.
   */
  public boolean isPostRender() {
    return postRender;
  }

  public boolean isReload() {
    return reload;
  }

}
