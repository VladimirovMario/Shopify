const host = "http://localhost:3030";

export const requester = async (method, token, url, data) => {
  const options = {};

  if (method !== "GET") {
    options.method = method;
  }

  if (data !== undefined) {
    options.headers = {
      "Content-Type": "application/json",
    };
    options.body = JSON.stringify(data);
  }

  if (token) {
    options.headers = {
      ...options.headers,
      "X-Authorization": token,
    };
    // console.log("From requester.js", token);
  }

  try {
    const response = await fetch(host + url, options);
    // console.log("From requester.js", response);

    if (response.ok === false) {
      const error = await response.json();
      throw new Error(error.message);
    }

    if (response.status !== 204) {
      return await response.json();
    }

    return response;
  } catch (error) {
    throw error;
  }
};

export const requestFactory = (token) => {
  return {
    get: requester.bind(null, "GET", token),
    post: requester.bind(null, "POST", token),
    put: requester.bind(null, "PUT", token),
    delete: requester.bind(null, "DELETE", token),
  };
};
