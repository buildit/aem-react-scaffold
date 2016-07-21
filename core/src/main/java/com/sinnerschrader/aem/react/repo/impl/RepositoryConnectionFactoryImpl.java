package com.sinnerschrader.aem.react.repo.impl;

import java.util.Collections;
import java.util.Map;

import org.apache.felix.scr.annotations.Component;
import org.apache.felix.scr.annotations.Reference;
import org.apache.felix.scr.annotations.Service;
import org.apache.sling.api.resource.LoginException;
import org.apache.sling.api.resource.ResourceResolverFactory;

import com.sinnerschrader.aem.react.exception.TechnicalException;
import com.sinnerschrader.aem.react.repo.RepositoryConnection;
import com.sinnerschrader.aem.react.repo.RepositoryConnectionFactory;

@Component(metatype = false, immediate = true)
@Service
public class RepositoryConnectionFactoryImpl implements RepositoryConnectionFactory {


	@Reference
	private ResourceResolverFactory resResFactory;

	@Override
	public RepositoryConnection getConnection(String subServiceName) {
	  Map<String, Object> authInfo = Collections.singletonMap(ResourceResolverFactory.SUBSERVICE, (Object) subServiceName);
		try {
			return new RepositoryConnectionImpl(resResFactory.getResourceResolver(authInfo));
		} catch (LoginException e) {
			throw new TechnicalException("Unable to login to repository with subservice-name '" + subServiceName + "'.", e);
		}

	}

}
