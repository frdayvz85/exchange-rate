const actionBegin = (type) => ({
  type,
});

const actionSuccess = (type, data) => ({
  type,
  payload: data,
  error: null,
});

const actionFailure = (type, error) => {
  return {
    type,
    error,
  };
};

export { actionBegin, actionSuccess, actionFailure };
