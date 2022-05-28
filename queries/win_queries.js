import {Pool}  from "node-postgres";
import {db_data} from "../db_config.js";
import {win} from '../models/win.js';

const pool = new Pool(db_data);

export const get_wins = async () => {
    try {
        let wins = await pool.query('SELECT * FROM wins');

        return wins.rows;
    }

    catch (error) {
        return {message:'Error with DB transaction - reason: ' + error.message};
    }
}

export const get_win_by_id = async (id) => {
    try {
        let win = await pool.query(`SELECT * FROM wins WHERE id = ${id}`);

        return win.rows[0];
    }

    catch (error) {
        return {message:'Error with DB transaction - reason: ' + error.message};
    }
}

export const create_win = async (new_win) => {
    try {
        
        await pool.query(`INSERT INTO wins (post_id)
        VALUES(new_win.post_id);`);

        return {message:'Successful transaction with DB [CREATE NEW WIN]'};
    }

    catch (error) {
        return {message:'Error with DB transaction - reason: ' + error.message};
    }
}

