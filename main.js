// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(
  function (config) {
    console.log(
      `Intercepting request - Method: ${config.method}, URL: ${config.url}`
    );
    return config;
  },
  function (error) {
    console.error("Error intercepting request:", error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    console.log(
      `Intercepting response - Status: ${response.status}, Data:`,
      response.data
    );
    return response;
  },
  function (error) {
    console.error("Error intercepting response:", error);
    return Promise.reject(error);
  }
);

// GET REQUEST
function getTodos() {
  axios.get("/todos")
    .then(function (response) {
      showOutput(response);
    })
    .catch(function (error) {
      console.error(error);
    });
}

// POST REQUEST
function addTodo() {
  axios.post("/todos", {
      title: "New Todo",
      completed: false
    })
    .then(function (response) {
      showOutput(response);
    })
    .catch(function (error) {
      console.error(error);
    });
}

// PUT/PATCH REQUEST
function updateTodo() {
  axios.patch("/todos/1", {
      title: "Updated Todo",
      completed: true
    })
    .then(function (response) {
      showOutput(response);
    })
    .catch(function (error) {
      console.error(error);
    });
}

// DELETE REQUEST
function removeTodo() {
  axios.delete("/todos/1")
    .then(function (response) {
      showOutput(response);
    })
    .catch(function (error) {
      console.error(error);
    });
}

// SIMULTANEOUS DATA
function getData() {
  axios.all([
      axios.get("/todos"),
      axios.get("/posts")
    ])
    .then(axios.spread(function (todos, posts) {
      showOutput(todos);
      showOutput(posts);
    }))
    .catch(function (error) {
      console.error(error);
    });
}

// CUSTOM HEADERS
function customHeaders() {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer token123"
    }
  };

  axios.post("/todos", {
      title: "New Todo",
      completed: false
    }, config)
    .then(function (response) {
      showOutput(response);
    })
    .catch(function (error) {
      console.error(error);
    });
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options = {
    transformResponse: axios.defaults.transformResponse.concat(function (data) {
      data.title = data.title.toUpperCase();
      return data;
    })
  };

  axios.get("/todos/1", options)
    .then(function (response) {
      showOutput(response);
    })
    .catch(function (error) {
      console.error(error);
    });
}

// ERROR HANDLING
function errorHandling() {
  axios.get("/todos")
    .then(function (response) {
      showOutput(response);
    })
    .catch(function (error) {
      if (error.response) {
        // Request made and server responded with a status code outside the range of 2xx
        console.error(error.response.data);
        console.error(error.response.status);
        console.error(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error(error.message);
      }
    });
}

// CANCEL TOKEN
function cancelToken() {
  const source = axios.CancelToken.source();

  axios.get("/todos", {
      cancelToken: source.token
    })
    .then(function (response) {
      showOutput(response);
    })
    .catch(function (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        console.error(error);
      }
    });

  // Cancel the request
  setTimeout(function () {
    source.cancel("Request canceled");
  }, 100);
}

// Show output in browser
function showOutput(res) {
  document.getElementById("res").innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;

// Event listeners
document.getElementById("get").addEventListener("click", getTodos);
document.getElementById("post").addEventListener("click", addTodo);
document.getElementById("update").addEventListener("click", updateTodo);
document.getElementById("delete").addEventListener("click", removeTodo);
document.getElementById("sim").addEventListener("click", getData);
document.getElementById("headers").addEventListener("click", customHeaders);
document.getElementById("transform").addEventListener("click", transformResponse);
document.getElementById("error").addEventListener("click", errorHandling);
document.getElementById("cancel").addEventListener("click", cancelToken);
