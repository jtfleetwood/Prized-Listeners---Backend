/*******************************************************************************
 * Developer: JT Fleetwood
 * Module: Queries for all post-specific queries.
 * ****************************************************************************/

import {Pool} from 'node-postgres';
import {db_data} from "./db_config.js";
import {post} from '../models/post.js';
import { get_current_week } from './maintenance_queries.js';

const pool = new Pool(db_data);

pool.on('error', (err, client) => {
    console.log(err);
    return;
});

// Get's all posts from the database.
export const get_posts = async () => {
    
    try {
        const posts = await pool.query('SELECT * FROM posts');

        return posts.rows;
    }

    catch (error) {
        return {message:'Error with DB transaction - reason: ' + error.message};
    }
}

// Get's all posts for the current contest week.
export const get_posts_by_current_week = async () => {
    try {
        const current_week = await get_current_week();

        const posts = await pool.query(`SELECT * from posts WHERE contest_week = ${current_week}`);

        return posts.rows;
    }

    catch (error) {
        return {message:'Error with DB transaction - reason: ' + error.message};
    }
}

// Get's a post by id.
export const get_post_by_id = async (id) => {
    try {
        let post = await pool.query(`SELECT * FROM posts WHERE id = ${id}`);

        return post.rows[0];
    }

    catch (error) {
        return {message:'Error with DB transaction - reason: ' + error.message};
    }
}

// Create's a post.
export const create_post = async (new_post) => {
    try {
        
        await pool.query(`INSERT INTO posts (user_id, title, upvotes, yt_url, primary_artist, contest_week, is_winner)
        VALUES('${new_post.user_id}', '${new_post.title}', ${new_post.upvotes}, 
        '${new_post.yt_url}', '${new_post.primary_artist}', ${new_post.contest_week}, ${new_post.is_winner});`);

        /* 
        
            Using status returns in this query, as this is the only query that a user can directly interact with through providing info.
            Ex: A unique constraint is enforced on yt_url within DB so no replicate songs are provided, thus the only way this query fails
            is if that occurs. So, this status below lets us know the outcome on the front-end of whether the song was taken or not.
        
        */
        return {status:201};
    }

    catch (error) {
        return {status:406};
    }
}

// Add upvote to a specific post by id.
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

// Add downvote to a specific post by id.
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

// Find post count by user for a specific week.
export const find_post_count_by_user = async (user_id, week) => {
    try {
        const post = await pool.query(`SELECT * FROM posts where user_id = '${user_id}' AND contest_week = ${week}`);

        return {count : post.rowCount};

    }

    catch (error) {
        return {message: 'Error with DB transaction - reason: ' + error.message};
    }
}

// Ensures that user does not vote on their own post.
export const check_user_self_vote = async (user_id, post_id) => {
    try {
        const post = await pool.query(`SELECT * from posts WHERE id = ${post_id}`);

        if (post.rows[0].user_id === user_id) {
            return {status: true};
        }

        return {status: false};
    }

    catch (error) {
        console.log(error);
    }
}
