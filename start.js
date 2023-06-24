// GET REQUEST
async function getTodos() {
  try {
    const response = await axios.get("/todos");
    showOutput(response);
  } catch (error) {
    console.error(error);
  }
}

// POST REQUEST
async function addTodo() {
  try {
    const response = await axios.post("/todos", {
      title: "New Todo",
      completed: false
    });
    showOutput(response);
  } catch (error) {
    console.error(error);
  }
}

// PUT/PATCH REQUEST
async function updateTodo() {
  try {
    const response = await axios.patch("/todos/1", {
      title: "Updated Todo",
      completed: true
    });
    showOutput(response);
  } catch (error) {
    console.error(error);
  }
}

// DELETE REQUEST
async function removeTodo() {
  try {
    const response = await axios.delete("/todos/1");
    showOutput(response);
  } catch (error) {
    console.error(error);
  }
}

// SIMULTANEOUS DATA
async function getData() {
  try {
    const [todos, posts] = await Promise.all([
      axios.get("/todos"),
      axios.get("/posts")
    ]);
    showOutput(todos);
    showOutput(posts);
  } catch (error) {
    console.error(error);
  }
}

// CUSTOM HEADERS
async function customHeaders() {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer token123"
      }
    };
    const response = await axios.post("/todos", {
      title: "New Todo",
      completed: false
    }, config);
    showOutput(response);
  } catch (error) {
    console.error(error);
  }
}

// TRANSFORMING REQUESTS & RESPONSES
async function transformResponse() {
  try {
    const options = {
      transformResponse: axios.defaults.transformResponse.concat(function (data) {
        data.title = data.title.toUpperCase();
        return data;
      })
    };
    const response = await axios.get("/todos/1", options);
    showOutput(response);
  } catch (error) {
    console.error(error);
  }
}

// ERROR HANDLING
async function errorHandling() {
  try {
    const response = await axios.get("/todos");
    showOutput(response);
  } catch (error) {
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
  }
}

// CANCEL TOKEN
async function cancelToken() {
  const source = axios.CancelToken.source();

  try {
    const response = await axios.get("/todos", {
      cancelToken: source.token
    });
    showOutput(response);
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Request canceled", error.message);
    } else {
      console.error(error);
    }
  }

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
