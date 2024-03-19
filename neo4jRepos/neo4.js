var neo4j = require("neo4j-driver")
var driver = neo4j.driver(
    process.env.NEO_URI,
    neo4j.auth.basic(process.env.NEO_USER, process.env.NEO_PASSWORD)
  )


const createSession = () => driver.session()

module.exports = {driver, createSession}

