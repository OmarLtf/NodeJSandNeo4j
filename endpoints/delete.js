const { testNeo, testRunQueyry } = require("../services/testService")

function deleteDatabase(req, res) {
    const query = `
    MATCH (n) DETACH DELETE n
  `;
  testRunQueyry(query)
    .then(response => {
      res.send("Deleted succussfully")
    })
    .catch(error => {
      res.status(500).send({error: error.message});
    })
  }

  module.exports = {deleteDatabase}