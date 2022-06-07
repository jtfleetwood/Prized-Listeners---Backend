import {Pool} from 'node-postgres';
import {db_data} from "./db_config.js";
import {post} from '../models/post.js';

const pool = new Pool(db_data);

export const get_posts = async () => {
    
    try {
        let posts = await pool.query('SELECT * FROM posts');

        return posts.rows;
    }

    catch (error) {
        return {message:'Error with DB transaction - reason: ' + error.message};
    }
}

export const get_post_by_id = async (id) => {
    try {
        let post = await pool.query(`SELECT * FROM posts WHERE id = ${id}`);

        return post.rows[0];
    }

    catch (error) {
        return {message:'Error with DB transaction - reason: ' + error.message};
    }
}

export const create_post = async (new_post) => {
    try {
        await pool.query(`INSERT INTO posts (user_id, title, upvotes, yt_url, primary_artist, contest_week, is_winner)
        VALUES('${new_post.user_id}', '${new_post.title}', ${new_post.upvotes}, '${new_post.yt_url}', '${new_post.primary_artist}', ${new_post.contest_week}, ${new_post.is_winner});`);

        return {message:'Successful transaction with DB [CREATE NEW POST]'};
    }

    catch (error) {
        return {message:'Error with DB transaction - reason: ' + error.message};
    }
}

export const add_post_upvote = async (id) => {
    try {
        await pool.query(`UPDATE posts SET upvotes = upvotes + 1
        WHERE id = ${id}`);

        return {message: 'Successful transaction with DB [NEW UPVOTE]'};

    }

    catch (error) {
        return {message: 'Error with DB transaction - reason: ' + error.message};
    }
}

export const add_post_downvote = async (id) => {
    try {
        await pool.query(`UPDATE posts SET upvotes = upvotes - 1
        WHERE id = ${id}`);

        return {message: 'Successful transaction with DB [NEW UPVOTE]'};
    }

    catch (error) {
        return {message: 'Error with DB transaction - reason: ' + error.message};
    }
}

export const find_post_count_by_user = async (user_id, week) => {
    try {
        const post = await pool.query(`SELECT * FROM posts where user_id = '${user_id}' AND contest_week = ${week}`);

        return {count : post.rowCount};

    }

    catch (error) {
        return {message: 'Error with DB transaction - reason: ' + error.message};
    }
}
