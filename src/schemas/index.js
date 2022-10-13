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

//const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//     username: { type: String, required: true },
//     password: { type: String, required: true },
//     first_name: { type: String, required: true },
//     last_name: { type: String, required: true },
//     refresh_token: { type: String },

// });

// const User = mongoose.model('User', userSchema);