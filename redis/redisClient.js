const redis = require("redis");
const redisClient = redis.createClient(6379);

module.exports = redisClient;
