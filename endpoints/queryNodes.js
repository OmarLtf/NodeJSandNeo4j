const { testNeo, testRunQueyry } = require("../services/testService")
var { DataGenerator, firstNames, lastNames, skills, markers, cities, opportunities, availabilities, employeeAttributes } = require('../modules/dataGenerator')
var { CypherQueryBuilder } = require('../modules/cypherQueryBuilder')
var { Utils } = require('../modules/utils')

function queryEmployeesByOpportunity(req, res) {
    const { opportunityName } = req.query;
    const searchTerm = { opportunityName: "Network Administrator" };
    const query = CypherQueryBuilder.createMatchQueryWithRelationOpportunity(searchTerm);
    testRunQueyry(query)
      .then(response => {
        const formattedData = Utils.formatData(response.records, employeeAttributes);
        res.send(formattedData);
      })
      .catch(error => {
        res.status(500).send({ error: error.message });
      });
  }
  
  function queryOpportunitiesByCity(req, res) {
    const searchTerm = { cityName: "Munich" };
    const query = CypherQueryBuilder.createMatchQueryWithRelationCity(searchTerm);
    testRunQueyry(query)
      .then(response => {
        const formattedData = Utils.formatData(response.records, ["id", "opportunityName", "City"]);
        res.send(formattedData);
      })
      .catch(error => {
        res.status(500).send({ error: error.message });
      });
  }
  
  function queryEmployeesBySkills(req, res) {
    const searchTerm = { skillName: "Java" };
    const query = CypherQueryBuilder.createMatchQueryWithRelationOpportunity(searchTerm);
    testRunQueyry(query)
      .then(response => {
        const formattedData = Utils.formatData(response.records, employeeAttributes);
        res.send(formattedData);
      })
      .catch(error => {
        res.status(500).send({ error: error.message });
      });
  }
  


  module.exports = {
    queryEmployeesByOpportunity, 
    queryOpportunitiesByCity, 
    queryEmployeesBySkills, 
  }