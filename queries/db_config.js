/*******************************************************************************
 * Developer: JT Fleetwood
 * Module: Config information for Heroku hosted DB.
 * ****************************************************************************/

import dotenv from 'dotenv';
import findConfig from 'find-config';

dotenv.config({path:findConfig('.env')});

export const db_data = {
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT, 
    ssl: {
        rejectUnauthorized:false
    }
}



