import express from 'express';
import * as queries from '../queries/win_queries.js';

const win_router = express.Router();

post_router.get('/', (req, res) => {
    res.send(await queries.get_wins());
});

post_router.get('/:id', (req, res) => {
    res.send(await queries.get_win_by_id(req.params.id));
});

post_router.post('/new_win', (req, res) => {
    res.send(await queries.create_win(req.body));
});