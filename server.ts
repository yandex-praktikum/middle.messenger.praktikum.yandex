import express from 'express'; // eslint-disable-line

const app = express();
const port = 3000;

app.use(express.static('build'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
