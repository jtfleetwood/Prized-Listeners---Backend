import {Pool}  from "node-postgres";
import { db_data } from "./db_config.js";
import {win} from '../models/win.js';
import { get_current_week } from "./maintenance_queries.js";

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
        VALUES('${new_win.post_id}');`);

        return {message:'Successful transaction with DB [CREATE NEW WIN]'};
    }

    catch (error) {
        return {message:'Error with DB transaction - reason: ' + error.message};
    }
}

export const find_winner = async () => {
    try {
        const current_week = await get_current_week();

        const query = await pool.query(`SELECT * FROM posts 
        WHERE upvotes = (SELECT max(upvotes) FROM posts)
        AND contest_week = ${current_week}`);
        
        return query;
    }

    catch (error) {
        console.log(error);
    }
}

export const set_posts_to_winner = async (winners) => {

    try {
        if (winners.rowCount == 1) {
            await pool.query(`UPDATE posts SET is_winner = true
            WHERE id = ${winners.rows[0].id}`);
    
            return;
        }
    
        let set_winner_query = (`UPDATE posts
        SET is_winner = true 
        WHERE`)
    
        for (let i = 0; i < winners.rowCount; i++) {
            if (i + 1 == winners.rowCount) {
                set_winner_query += ` id = ${winners.rows[i].id}`
            }
    
            else {
                set_winner_query += ` id = ${winners.rows[i].id} OR`
            }
        }
    }

    catch(error) {
        console.log(error);
    }
    
}

