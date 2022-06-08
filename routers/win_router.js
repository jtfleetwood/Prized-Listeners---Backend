import express from 'express';
import * as queries from '../queries/win_queries.js';

export const win_router = express.Router();

win_router.get('/', async (req, res) => {
    res.send(await queries.get_wins());
});

win_router.get('/:id', async (req, res) => {
    res.send(await queries.get_win_by_id(req.params.id));
});

win_router.post('/new_win', async (req, res) => {
    res.send(await queries.create_win(req.body));
});

win_router.get('/user/:user_id', async (req, res) => {
    res.send(await queries.get_user_win_count(req.params.user_id));
})