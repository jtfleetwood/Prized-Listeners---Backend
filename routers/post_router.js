import express from 'express';
import * as queries from '../queries/post_queries';

const post_router = express.Router();

post_router.get('/', (req, res) => {
    res.send(await queries.get_posts());
});

post_router.get('/:id', (req, res) => {
    res.send(await queries.get_post_by_id(req.params.id));
});

post_router.post('/new_post', (req, res) => {
    res.send(await queries.create_post(req.body));
});