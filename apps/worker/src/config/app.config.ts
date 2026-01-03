export const AppConfig = {
  redis: {
    host: process.env.REDIS_HOST ?? 'localhost',
    port: Number(process.env.REDIS_PORT ?? 6379),
},
  queues: {
    name: process.env.QUEUE_NAME ?? 'utility-queue',
  }
};
