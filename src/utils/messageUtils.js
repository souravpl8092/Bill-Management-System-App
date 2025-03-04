export const showSuccess = (setSuccess) => {
  setSuccess(true);
  setTimeout(() => setSuccess(false), 3000);
};

export const showError = (message, setError) => {
  setError(message);
  setTimeout(() => setError(""), 3000);
};
