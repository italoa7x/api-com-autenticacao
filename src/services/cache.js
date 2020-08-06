const Redis = require('ioredis');


class Cache{
    constructor(){
        this.redis = new Redis({
            host: process.env.REDIS_HOST || "localhost",
            port: process.env.REDIS_PORT || 6379,
            keyPrefix: process.env.REDIS_PREFIX || "cache:"
        });
    }
    // recebe a chave que será buscada em memória
    async get(key){
        const value = await this.redis.get(key);
        return value ? JSON.parse(value) : null;
    }
    // recebe a chave, o valor e o tempo de timeout para inserir os dados em cache.
    set(key, value, time) {
        return this.redis.set(key, JSON.stringify(value), "EX", time);
    }
    // recebe uma chave e remove da memória
    del(key){
        return this.redis.del(key);
    }

    async delPrefix(prefix){
        const keys = (await this.redis.keys(`cache:${prefix}:*`)).map(key => {
            key.replace("cache:", "")
        });
    }
}

module.exports = new Cache();