import express from 'express';
import * as queries from '../queries/post_queries.js';
import * as auth0_services from '../Auth0/services.js';

export const post_router = express.Router();

post_router.get('/', async (req, res) => {
    res.send(await queries.get_posts_by_current_week());
});

post_router.get('/:id', async (req, res) => {
    res.send(await queries.get_post_by_id(req.params.id));
});

post_router.post('/new_post', async (req, res) => {
    res.send(await queries.create_post(req.body));
});

post_router.patch('/:id/new_upvote', async (req, res) => {
    await auth0_services.set_did_vote(req.body.user_id);
    res.send(await queries.add_post_upvote(req.params.id));
});

post_router.patch('/:id/new_downvote', async (req, res) => {
    await auth0_services.set_did_vote(req.body.user_id);
    res.send(await queries.add_post_downvote(req.params.id));
});

post_router.get('/:user_id/:week', async (req, res) => {
    res.send(await queries.find_post_count_by_user(req.params.user_id, req.params.week));
});

post_router.get('/:user_id/:post_id/did_self_vote', async (req, res) => {
    res.send(await queries.check_user_self_vote(req.params.user_id, req.params.post_id));
});
