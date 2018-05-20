let env = process.env.NODE_ENV;

let config = {
  env: env,
  host: "localhost",
  port: env == "dev" ? "1314" : (env == "pre" ? "80" : "443"),
  online: !(env == "dev" || env == "pre" || env == "prd")
}

module.exports = config;