const neo4j = require("neo4j-driver");

// Assuming default Neo4j Desktop settings
const uri = "bolt://localhost:7687"; // Default URI for local Neo4j
const user = "neo4j"; // Default username
const password = "piterion"; // Default password

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

const createSession = () => driver.session();

module.exports = { driver, createSession };
