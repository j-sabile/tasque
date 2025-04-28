const authenticate = (req, res, next) => {
  // place authentication mechanism here
  // check if user or admin is logged in
  next();
};

export { authenticate };
