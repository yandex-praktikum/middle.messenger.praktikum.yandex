import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.static(`./dist`));

app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`);
});
