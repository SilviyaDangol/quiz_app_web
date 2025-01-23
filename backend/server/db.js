const {Client} = require('pg')

const client = new Client({
    user:'postgres',
    host:'localhost',
    database:'quiz_app',
    password:'root'
    port:5432,
})

const query = `
        CREATE TABLE IF NOT EXISTS questions (
            id SERIAL PRIMARY KEY,
            question VARCHAR(255) NOT NULL,
            answer VARCHAR(255) NOT NULL,
            hint VARCHAR(255) NOT NULL,
            category VARCHAR(255) NOT NULL,
)`

const extension = 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp"'
const userTable =
    `CREATE TABLE IF NOT EXISTS user(
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        score integer,
     )`