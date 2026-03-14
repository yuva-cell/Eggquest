// This MUST be the very first import in index.js so that process.env is
// populated before any other module reads it (ES-module hoisting means all
// imports run before the body of index.js—including the dotenv.config() call).
import dotenv from 'dotenv';
dotenv.config();
