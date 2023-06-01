'use strict';

const Sequelize = require('sequelize');
const path = require('path');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'db.json'))[
    env
];
const db = {};

let sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
    {
        define: {
            charset: 'uth8',
            collate: 'utf8-general_ci'
        }
    }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');

    })
    .catch((err)=> {
        console.log('Unable to connect to the database: ', err);
    })

// 테이블 생성
db.User = require('./user')(sequelize, Sequelize);
db.Excutive = require('./excutive')(sequelize, Sequelize);
db.Pro = require('./pro')(sequelize, Sequelize);
db.Citizen = require('./citizen')(sequelize, Sequelize);
db.History = require('./history')(sequelize, Sequelize);
db.Popup = require('./popup')(sequelize, Sequelize);
db.Board = require('./board')(sequelize, Sequelize);
db.Contest_intro = require('./contest_intro')(sequelize, Sequelize);
db.Apply_contest = require('./apply_contest')(sequelize, Sequelize);
db.Img = require('./img')(sequelize, Sequelize);
db.Document = require('./document')(sequelize, Sequelize);
db.Form = require('./form')(sequelize, Sequelize);
// 관계형 지정
require('./user/foreignKey')(db);
require('./excutive/foreignKey')(db);
require('./pro/foreignKey')(db);
require('./citizen/foreignKey')(db);
require('./history/foreignKey')(db);
require('./popup/foreignKey')(db);
require('./board/foreignKey')(db);
require('./contest_intro/foreignKey')(db);
require('./apply_contest/foreignKey')(db);
require('./img/foreignKey')(db);
require('./document/foreignKey')(db);
require('./form/foreignKey')(db);

module.exports = db;