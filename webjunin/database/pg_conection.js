import {Sequelize} from 'sequelize';

const database = "dbjunin";
const username = "postgres";
const password = "1206234302";
const host = "localhost";
const port = "5432";

export const sequelize = new Sequelize(database,username,password,
{
	host:host,
	dialect: 'postgres',
	port: port,
});