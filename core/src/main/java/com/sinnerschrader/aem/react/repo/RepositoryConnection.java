package com.sinnerschrader.aem.react.repo;

import javax.jcr.Session;

import org.apache.sling.api.resource.ResourceResolver;

public interface RepositoryConnection extends AutoCloseable {

	public com.day.cq.wcm.api.PageManager getPageManager();
	ResourceResolver getResourceResolver();

	public Session getSession();

	/**
	 * Re-declared without "throws Exception".
	 */
	@Override
	public void close();


}
