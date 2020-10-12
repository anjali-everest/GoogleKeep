const { createProxyMiddleware } = require("http-proxy-middleware");
const proxy = app =>{
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true,
    })
  );
}

export default proxy;
