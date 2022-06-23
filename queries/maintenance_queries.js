/*******************************************************************************
 * Developer: JT Fleetwood
 * Module: Queries performed for strictly maintenance reasons.
 * ****************************************************************************/

import {Pool} from 'node-postgres';
import { db_data } from './db_config.js';

const pool = new Pool(db_data);

// This is the callback function executed after any error occurs with a specific query.
pool.on('error', (err, client) => {
    console.log(err);
    return;
});

// Get's current week variable from DB.
export const get_current_week = async () => {

    try {
        const query = await pool.query(`SELECT * FROM variables WHERE name = 'contest_week'`);

        return Number(query.rows[0].value);

    }

    catch(error) {
        console.log(error);
    }

}

// Increments current week variable from DB.
export const inc_current_week = async () => {
    try {
        let current_week = await get_current_week()
        
        current_week++;

        const str_current_week = current_week.toString();

        await pool.query(`UPDATE variables 
        SET value = '${str_current_week}'
        WHERE name = 'contest_week'`);
    }

    catch (error) {
        console.log(error);
    }
}