const required = ["MONGO_URI", "JWT_SECRET", "REDIS_URL"];

required.forEach((env) => {
  if (!process.env[env]) {
    throw new Error(`${env} missing in .env`);
  }
});

console.log("Environment OK");
