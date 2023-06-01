const http = require('http');

const express = require('express');
const methodOverride = require('method-override');
const cors = require('cors');
const nunjucks = require('nunjucks');

const sequelize = require('./models').sequelize;
const router = require('./routes');
const port = process.env.port || 8900;

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(methodOverride());
app.use(cors());

sequelize.sync();
app.use('/', router);

nunjucks.configure('views', {
    express: app,
})
app.set('view engine', 'html');

const server = http.createServer(app);

server.listen(port, () => console.log(
    `express started on http://localhost:${port}
    press Ctrl-C to terminate. `
))