import {Pool} from 'node-postgres';
import { db_data } from './db_config.js';

const pool = new Pool(db_data);

pool.on('error', (err, client) => {
    return;
});

export const get_current_week = async () => {

    try {
        const query = await pool.query(`SELECT * FROM variables WHERE name = 'contest_week'`);

        return Number(query.rows[0].value);

    }

    catch(error) {
        console.log(error);
    }

}

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