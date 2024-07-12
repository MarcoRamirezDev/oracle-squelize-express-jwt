const headers = {
  'Content-Type': 'application/json',
};

const done = (body, code, error = null) => {
  return {
    body: {
      ok: !error,
      response: body,
      responseCode: code,
      validations: error ? [error.message] : [],
    },
    statusCode: code,
    headers,
  };
};

exports.success = (res, data, code = 200) => {
  const response = done(data, code);
  res.status(response.statusCode).json(response.body);
};

exports.error = (res, err, code = 500) => {
  const response = done(null, code, err);
  res.status(response.statusCode).json(response.body);
};
