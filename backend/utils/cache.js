const { redisClient } =
require("../config/redis");

const getCache = async (key) => {
  const data =
    await redisClient.get(key);

  return data
    ? JSON.parse(data)
    : null;
};

const setCache = async (
  key,
  value,
  ttl = 300
) => {
  await redisClient.set(
    key,
    JSON.stringify(value),
    {
      EX: ttl,
    }
  );
};

module.exports = {
  getCache,
  setCache,
};