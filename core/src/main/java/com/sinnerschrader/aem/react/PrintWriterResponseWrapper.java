package com.sinnerschrader.aem.react;

import java.io.IOException;
import java.io.PrintWriter;

import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.wrappers.SlingHttpServletResponseWrapper;

/**
 * Wrapper response to redirect the output into a specified print writer
 */
public class PrintWriterResponseWrapper extends SlingHttpServletResponseWrapper {

    private final PrintWriter writer;

    /**
     * Create a wrapper for the supplied wrappedRequest
     *
     * @param writer - the base writer
     * @param wrappedResponse - the wrapped response
     */
    public PrintWriterResponseWrapper(PrintWriter writer, SlingHttpServletResponse wrappedResponse) {
        super(wrappedResponse);
        this.writer = writer;
    }

    @Override
    public PrintWriter getWriter() throws IOException {
        return writer;
    }

}
