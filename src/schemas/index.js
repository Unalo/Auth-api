// import pgp from "pg-promise"
const pgp = require("pg-promise");
const pgPromise = pgp({})

const DATABASE_URL= process.env.DATABASE_URL || "postgresql://localhost:5432/auth-with-jwt";

const config = { 
	connectionString : DATABASE_URL
}

if (process.env.NODE_ENV == 'production') {
	config.ssl = { 
		rejectUnauthorized : false
	}
}

const db = pgPromise(config);

module.exports = db;
