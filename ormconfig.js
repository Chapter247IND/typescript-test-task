module.exports = {
  type: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: process.env.NODE_ENV === "development",
  migrationsTableName: "migrations",
  entities: ["src/entities/**/*.ts"],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: ["src/subscribers/**/*.ts"],
  cli: {
    migrationsDir: "src/migrations",
  },
};
