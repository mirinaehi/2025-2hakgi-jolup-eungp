require('dotenv').config();

const express = require('express');
const app = express();

app.use(express.json());

// 라우터 장착
const authRouter = require('./routes/auth');
const travelRouter = require('./routes/travel');

app.use('/auth', authRouter);   // ✅ /auth/* 경로 활성화
app.use('/travel', travelRouter);

// 홈
app.get('/', (req, res) => res.redirect('/travel'));

// 404 핸들러 (선택)
app.use((req, res) => res.status(404).render('404'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
