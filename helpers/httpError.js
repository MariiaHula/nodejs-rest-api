const errorStatuses = {
  400: "Bad Request",
  401: "Unauthrized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
};
const httpError = (status, message = errorStatuses[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = httpError;
