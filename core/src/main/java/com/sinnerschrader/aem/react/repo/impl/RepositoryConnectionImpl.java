package com.sinnerschrader.aem.react.repo.impl;

import com.day.cq.wcm.api.PageManager;

import javax.jcr.Session;

import org.apache.sling.api.resource.ResourceResolver;

import com.sinnerschrader.aem.react.repo.RepositoryConnection;

public class RepositoryConnectionImpl implements RepositoryConnection {

	private ResourceResolver resourceResolver;

	public RepositoryConnectionImpl(ResourceResolver resourceResolver) {
		this.resourceResolver = resourceResolver;
	}

	@Override
	public void close() {
		resourceResolver.close();
	}

	@Override
	public PageManager getPageManager() {
		return getResourceResolver().adaptTo(PageManager.class);
	}

	@Override
	public ResourceResolver getResourceResolver() {
		return resourceResolver;
	}

	@Override
	public Session getSession() {
		return resourceResolver.adaptTo(Session.class);
	}

}
