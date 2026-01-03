export const AppConfig = {
  env: process.env.NODE_ENV ?? 'development',

  api: {
    port: Number(process.env.PORT ?? 3000),
  },

  redis: {
    host: process.env.REDIS_HOST ?? 'localhost',
    port: Number(process.env.REDIS_PORT ?? 6379),
    ttl: Number(process.env.REDIS_TTL ?? 3600), // 1 hour
    ttl_failed: Number(process.env.REDIS_TTL_FAILED ?? 86400), // 24 hours
    items: Number(process.env.REDIS_COUNT_CACHE ?? 1000), // 1000 items
  },
  auth: {
    user: process.env.BULLBOARD_USER ?? 'admin',
    pass: process.env.BULLBOARD_PASS ?? 'admin',
  },
  queues: {
    name: process.env.QUEUE_NAME ?? 'utility-queue',
  },
};
