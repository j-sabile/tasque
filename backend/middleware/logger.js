const logger = (req, res, next) => {
  const timestamp = new Date().toLocaleTimeString();
  const method = req.method;
  const route = req.originalUrl;
  const body = JSON.stringify(req.body) || "";
  console.log(`[${timestamp}] ${method} ${route} \tBody: ${body}`);
  next();
};

export default logger;
