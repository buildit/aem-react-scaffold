package com.sinnerschrader.aem.react.repo;

public interface RepositoryConnectionFactory {

	public RepositoryConnection getConnection(String subServiceName);
}
