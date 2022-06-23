/*******************************************************************************
 * Developer: JT Fleetwood
 * Module: Router to handle all post-related endpoints.
 * ****************************************************************************/

import express from 'express';
import * as queries from '../queries/post_queries.js';
import * as auth0_services from '../Auth0/services.js';
import { post } from '../models/post.js';

// Initialization of post router.
export const post_router = express.Router();

// Endpoint to get all posts by current week.
post_router.get('/', async (req, res) => {
    res.send(await queries.get_posts_by_current_week());
});

// Endpoint to get post by id.
post_router.get('/:id', async (req, res) => {
    res.send(await queries.get_post_by_id(req.params.id));
});

// Endpoint to create new post.
post_router.post('/new_post', async (req, res) => {
    
    const result = await queries.create_post(req.body);

    res.status(result.status).send(result);
    
});

// Endpoint to add new upvote to post by id.
post_router.patch('/:id/new_upvote', async (req, res) => {
    // Setting did vote status for user who voted.
    await auth0_services.set_did_vote(req.body.user_id);
    res.send(await queries.add_post_upvote(req.params.id));
});

// Replicates above logic.
post_router.patch('/:id/new_downvote', async (req, res) => {
    await auth0_services.set_did_vote(req.body.user_id);
    res.send(await queries.add_post_downvote(req.params.id));
});

// Endpoint to find post count for user by week. Enables data validation on frontend.
post_router.get('/:user_id/:week', async (req, res) => {
    res.send(await queries.find_post_count_by_user(req.params.user_id, req.params.week));
});

// Endpoint to check if user is not voting on own post.
post_router.get('/:user_id/:post_id/did_self_vote', async (req, res) => {
    res.send(await queries.check_user_self_vote(req.params.user_id, req.params.post_id));
});
