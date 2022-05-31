// This interceptor will intercept all api calls in the project and can manipulate the api response
const {fetch: origFetch} = window;
window.fetch = async (...args) => {
  console.log("fetch called with args:", args); // Url, method, headers, body, etc
  const response = await origFetch(...args); // Getting original response
  const cloned_response = response.clone(); // Cloning that response so that we cannot touch the original response
  const { pathname, host } = new URL(cloned_response.url); // Making url structure
  
  /* work with the cloned response in a separate promise
     chain -- could use the same chain with `await`. */
  cloned_response
    .json()
    .then(body => console.log("intercepted response:", body))
    .catch(err => console.error(err))
  ;
    
  /* the original response can be resolved unmodified: */
  //return response;
  
  /* or mock the response: */
  return {
    ok: true,
    status: 200,
    json: async () => ({
      userId: 1,
      id: 1,
      title: "Mocked!!",
      completed: false
    })
  };
};

// test it out with a typical fetch call
fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then(response => response.json())
  .then(json => console.log("original caller received:", json))
  .catch(err => console.error(err))
;