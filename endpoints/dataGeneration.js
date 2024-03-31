const { testNeo, testRunQueyry } = require("../services/testService")
var { CypherQueryBuilder } = require('../modules/cypherQueryBuilder')
var { DataGenerator, firstNames, lastNames, skills, markers, cities, opportunities, availabilities, employeeAttributes } = require('../modules/dataGenerator')


function addEmployees(req, res) {
    const generator = new DataGenerator();
    const employees = generator.generatePeople(firstNames, lastNames);
    const result = CypherQueryBuilder.createNodesQueryFromList("Employee", employees);
    testRunQueyry(result)
      .then(resp => {
        testNeo("Employee").then(response => {
          employeeRecords = response.records.map(record => record._fields[0].properties);
        });
      })
      .then(() => res.send(`Done adding employees!`))
      .catch(error => res.status(500).send({ error: error.message }));
  }
  
  function addSkills(req, res) {
    const generator = new DataGenerator();
    const skillsToGenerate = generator.generateSkills(skills);
    const skillsResult = CypherQueryBuilder.createNodesQueryFromList("Skill", skillsToGenerate);
    testRunQueyry(skillsResult)
      .then(resp => {
        testNeo("Skill").then(response => {
          skillRecords = response.records.map(record => record._fields[0].properties);
        });
      })
      .then(() => res.send('Done adding skills!'))
      .catch(error => res.status(500).send({ error: error.message }));
  }
  
  function addCities(req, res) {
    const generator = new DataGenerator();
    const citiesQuery = CypherQueryBuilder.createNodesQueryFromList("City", cities);
    testRunQueyry(citiesQuery)
      .then(resp => {
        testNeo("City").then(response => {
          citiesRecords = response.records.map(record => record._fields[0].properties);
        });
      })
      .then(() => res.send('Done adding cities!'))
      .catch(error => res.status(500).send({ error: error.message }));
  }
  
  function addOpportunities(req, res) {
    const generator = new DataGenerator();
    const opportunitiesQuery = CypherQueryBuilder.createNodesQueryFromList("Opportunity", opportunities);
    testRunQueyry(opportunitiesQuery)
      .then(resp => {
        testNeo("Opportunity").then(response => {
          opportunitiesRecords = response.records.map(record => record._fields[0].properties);
        });
      })
      .then(() => res.send('Done adding opportunities'))
      .catch(error => res.status(500).send({ error: error.message }));
  }
  
  function addAvailabilities(req, res) {
    const generator = new DataGenerator();
    const availabilitiesQuery = CypherQueryBuilder.createNodesQueryFromList("Availability", availabilities);
    testRunQueyry(availabilitiesQuery)
      .then(resp => {
        testNeo("Availability").then(response => {
          availabilitiesRecords = response.records.map(record => record._fields[0].properties);
        });
      })
      .then(() => res.send('Done adding availabilities'))
      .catch(error => res.status(500).send({ error: error.message }));
  }

  module.exports = {
    addEmployees,
    addSkills,
    addCities,
    addOpportunities,
    addAvailabilities
};