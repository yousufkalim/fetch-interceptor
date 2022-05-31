# fetch-interceptor

This interceptor uses an async function to let the interceptor await on the fetch promise and presumably work with the response (mocking, reading, etc) but (at the time of writing) has a superfluous closure and doesn't show how to read the response body non-destructively. It also contains a variable aliasing bug leading to a stack overflow.

This interceptor is the most complete so far but has some irrelevant noise in the callback and doesn't mention anything about cloning the response to enable the body to be collected by the interceptor. It doesn't illustrate how a mock could be returned.