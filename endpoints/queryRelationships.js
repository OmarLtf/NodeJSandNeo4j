const { testNeo, testRunQueyry } = require("../services/testService")


function queryCitiesWithOpportunities(req, res) {
    const query = `
      MATCH (c:City)<-[:RUNS_IN]-(o:Opportunity)
      RETURN c, collect(o) AS opportunities
    `;
    testRunQueyry(query)
      .then(response => {
        const formattedData = response.records.map(record => {
          return {
            city: record.get("c").properties,
            opportunities: record.get("opportunities").map(opp => opp.properties)
          };
        });
        res.send(formattedData);
      })
      .catch(error => {
        res.status(500).send({ error: error.message });
      });
  }
  
  function queryOpportunitiesWithAvailabilities(req, res) {
    const query = `
      MATCH (o:Opportunity)-[:REQUIRES]->(a:Availability)
      RETURN o, collect(a) AS availabilities
    `;
    testRunQueyry(query)
      .then(response => {
        const formattedData = response.records.map(record => {
          return {
            opportunity: record.get("o").properties,
            availabilities: record.get("availabilities").map(avail => avail.properties)
          };
        });
        res.send(formattedData);
      })
      .catch(error => {
        res.status(500).send({ error: error.message });
      });
  }
  
  function queryCitiesWithAvailabilities(req, res) {
    const query = `
      MATCH (c:City)-[:HAS_AVAILABILITY]->(a:Availability)
      RETURN c, collect(a) AS availabilities
    `;
    testRunQueyry(query)
      .then(response => {
        const formattedData = response.records.map(record => {
          return {
            city: record.get("c").properties,
            availabilities: record.get("availabilities").map(avail => avail.properties)
          };
        });
        res.send(formattedData);
      })
      .catch(error => {
        res.status(500).send({ error: error.message });
      });
  }

  module.exports = {
    queryCitiesWithOpportunities, 
    queryOpportunitiesWithAvailabilities, 
    queryCitiesWithAvailabilities
  }