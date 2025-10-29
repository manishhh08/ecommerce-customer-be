export const createApiError = (message, statusCode = 404) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};
