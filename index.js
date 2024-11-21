import express from 'express';
import admin from 'firebase-admin';
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import cors from 'cors';
import 'dotenv/config';

initializeApp({ credential: applicationDefault() });

const app = express();
app.use(cors());

app.use(async (req, res, next) => {
    const { token } = req.query;

    if (!token) {
        return res.sendStatus(401);
    }

    const userInfo = await admin.auth().verifyIdToken(token);
    req.user = userInfo;
    next();
});


app.get('/', (req, res) => {
    res.json(req.user);
});

app.listen(8080, () => 'listening on 8080');