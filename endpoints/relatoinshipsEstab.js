const { testNeo, testRunQueyry } = require("../services/testService")
var { CypherQueryBuilder } = require('../modules/cypherQueryBuilder')
var { DataGenerator, firstNames, lastNames, skills, markers, cities, opportunities, availabilities, employeeAttributes } = require('../modules/dataGenerator')


function addSkillEmployeeRelations(req, res) {
    const generator = new DataGenerator();
    employeeRecords.forEach((emp, idx) => {
      const level = Math.floor(Math.random() * 5 + 1);
      const query = CypherQueryBuilder.createRelationToExistingNodes(emp, skillRecords[idx % skillRecords.length], { maturityLevel: level, maturityLevelMarker: markers[level - 1] }, "Employee", "Skill", "HAS_SKILL");
      testRunQueyry(query)
        .then(() => {
          // Handle success if needed
        })
        .catch(error => {
          // Handle error if needed
        });
    });
    res.send('Done adding relations between skills and employees');
  }
  
  function addCityOpportunityRelations(req, res) {
    opportunitiesRecords.forEach((opp, idx) => {
      const query = CypherQueryBuilder.createRelationToExistingNodes(opp, citiesRecords[idx % citiesRecords.length], {}, "Opportunity", "City", "RUNS_IN");
      testRunQueyry(query)
        .then(() => {
          // Handle success if needed
        })
        .catch(error => {
          // Handle error if needed
        });
    });
    res.send('Done adding relations between opportunities and cities');
  }
  
  function addOpportunitySkillRelations(req, res) {
    opportunitiesRecords.forEach((opp, idx) => {
      const query = CypherQueryBuilder.createRelationToExistingNodes(opp, skillRecords[idx % skillRecords.length], {}, "Opportunity", "Skill", "NEEDS");
      testRunQueyry(query)
        .then(() => {
          // Handle success if needed
        })
        .catch(error => {
          // Handle error if needed
        });
    });
    res.send('Done adding relations between opportunities and skills');
  }
  
  function addEmployeeCityRelations(req, res) {
    employeeRecords.forEach((emp, idx) => {
      const query = CypherQueryBuilder.createRelationToExistingNodes(emp, citiesRecords[idx % citiesRecords.length], {}, "Employee", "City", "LIVES_IN");
      testRunQueyry(query)
        .then(() => {
          // Handle success if needed
        })
        .catch(error => {
          // Handle error if needed
        });
    });
    res.send('Done adding relations between employees and cities');
  }
  
  function addEmployeeAvailabilityRelations(req, res) {
    employeeRecords.forEach((emp, idx) => {
      const query = CypherQueryBuilder.createRelationToExistingNodes(emp, availabilitiesRecords[idx % availabilitiesRecords.length], {}, "Employee", "Availability", "HAS_STATUS");
      testRunQueyry(query)
        .then(() => {
          // Handle success if needed
        })
        .catch(error => {
          // Handle error if needed
        });
    });
    res.send('Done adding relations between employees and availabilities');
  }
  

  module.exports = {
    addSkillEmployeeRelations, 
    addCityOpportunityRelations, 
    addOpportunitySkillRelations, 
    addEmployeeAvailabilityRelations, 
    addEmployeeCityRelations
  }