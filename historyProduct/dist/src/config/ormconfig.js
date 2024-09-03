import { config } from "dotenv";
config();
import { DataSource } from "typeorm";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DB,
    synchronize: true,
    logging: true,
    schema: "public",
    entities: [
        __dirname + '/../database/entities/*.js'
    ],
    migrations: [
        __dirname + '/../database/migrations/*.js'
    ],
    subscribers: []
});
