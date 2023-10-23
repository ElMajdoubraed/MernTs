const redisClient = require("../config/redis");

redisClient.connect();

exports.set = async function (key: string, data: string, timeout = 86400) {
  await redisClient.set(key, data);
};

exports.get = async function (key: string) {
  return await redisClient.get(key);
};

exports.delete = function (key: string) {
  return redisClient.delAsync(key);
};

exports.deleteAllByPattern = function (pattern: string) {
  let keysToRemove = [];
  return redisClient.keysAsync(pattern).then(function (keys: any) {
    keysToRemove = keys;
    if (keysToRemove.length > 0) {
      redisClient.del(keysToRemove);
    }
  });
};

exports.getKeys = function (pattern: string) {
  return redisClient.keysAsync(pattern);
};
