import express from 'express';
import * as queries from '../queries/post_queries.js';

export const post_router = express.Router();

post_router.get('/', async (req, res) => {
    res.send(await queries.get_posts());
});

post_router.get('/:id', async (req, res) => {
    res.send(await queries.get_post_by_id(req.params.id));
});

post_router.post('/new_post', async (req, res) => {
    res.send(await queries.create_post(req.body));
});