import dotenv from 'dotenv';
dotenv.config();

export const db_data = {
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT, 
    ssl: {
        rejectUnauthorized:false
    }
}


