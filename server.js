var express = require("express")
var { DataGenerator, firstNames, lastNames, skills, markers, cities, opportunities, availabilities, employeeAttributes } = require('./modules/dataGenerator')
var { Utils } = require('./modules/utils')
var { CypherQueryBuilder } = require('./modules/cypherQueryBuilder')
var path = require("path")
var logger = require("morgan")
var bodyParser = require("body-parser")
require('dotenv').config()
var app = express()
const { testNeo, testRunQueyry } = require("./services/testService")

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))


let employeeRecords = []

let skillRecords = []
let citiesRecords = []
let opportunitiesRecords = []
let availabilitiesRecords = []



// ENDPOINTS TO MOCK DATA START

app.get("/employees", (req, res) => {

  const generator = new DataGenerator()

  const employees = generator.generatePeople(firstNames, lastNames)
  const result = CypherQueryBuilder.createNodesQueryFromList("Employee", employees)

  testRunQueyry(result).then(resp => {
    testNeo("Employee").then(response => {
      employeeRecords = response.records.map(record => record._fields[0].properties)
    })
  })

  res.send(`done adding employees!`)

})


app.get("/skills", (req, res) => {

  const generator = new DataGenerator()
  const skillsTogenerate = generator.generateSkills(skills)
  const skillsResult = CypherQueryBuilder.createNodesQueryFromList("Skill", skillsTogenerate)

  testRunQueyry(skillsResult).then(resp => {
    testNeo("Skill").then(response => {
      skillRecords = response.records.map(record => record._fields[0].properties)
    })
  })

  res.send('done adding skills!')
})

app.get("/cities", (req, res) => {

  const generator = new DataGenerator()
  const citiesQuery = CypherQueryBuilder.createNodesQueryFromList("City", cities)

  testRunQueyry(citiesQuery).then(resp => {
    testNeo("City").then(response => {
      citiesRecords = response.records.map(record => record._fields[0].properties)
    })
  })

  res.send('done adding cities!')
})

app.get('/opportunities', (req, res) => {
  const generator = new DataGenerator()
  const opportunitiesQuery = CypherQueryBuilder.createNodesQueryFromList("Opportunity", opportunities)
  testRunQueyry(opportunitiesQuery).then(resp => {
    testNeo("Opportunity").then(response => {
      opportunitiesRecords = response.records.map(record => record._fields[0].properties)
    })
  })

  res.send('done adding opportunities')
})

app.get('/availabilities', (req, res) => {
  const generator = new DataGenerator()
  const availabilitiesQuery = CypherQueryBuilder.createNodesQueryFromList("Availability", availabilities)
  testRunQueyry(availabilitiesQuery).then(resp => {
    testNeo("Availability").then(response => {
      availabilitiesRecords = response.records.map(record => record._fields[0].properties)
    })
  })

  res.send('done adding opportunities')
})



app.get("/relations_skill_employee", (req, res) => {


  const generator = new DataGenerator()
  console.log("these are the employees")
  console.log(employeeRecords)
  console.log("these are the skills")
  console.log(skillRecords)

  employeeRecords.forEach((emp, idx) => {
    const level = Math.floor(Math.random() * 5 + 1)
    const quer = CypherQueryBuilder.createRelationToExistingNodes(emp, skillRecords[idx % skillRecords.length], { maturityLevel: level, maturityLevelMarker: markers[level - 1] }, "Employee", "Skill", "HAS_SKILL")
    console.log("this is the query")
    console.log(quer)
    testRunQueyry(quer).then(resp => {
      console.log("done")
    }).catch(error => {
      console.log(error)
    })
  })


  res.send('done adding relations between skill and employee')

})

app.get("/relations_city_opportunity", (req, res) => {


  const generator = new DataGenerator()


  opportunitiesRecords.forEach((opp, idx) => {
    const quer = CypherQueryBuilder.createRelationToExistingNodes(opp, citiesRecords[idx % citiesRecords.length], {}, "Opportunity", "City", "RUNS_IN")
    console.log("this is the query")
    console.log(quer)
    testRunQueyry(quer).then(resp => {
      console.log("done")
    }).catch(error => {
      console.log(error)
    })
  })


  res.send('done adding relations between opportunity and city')

})

app.get("/relations_opportunity_skill", (req, res) => {


  const generator = new DataGenerator()


  opportunitiesRecords.forEach((opp, idx) => {
    const quer = CypherQueryBuilder.createRelationToExistingNodes(opp, skillRecords[idx % skillRecords.length], {}, "Opportunity", "Skill", "NEEDS")
    console.log("this is the query")
    console.log(quer)
    testRunQueyry(quer).then(resp => {
      console.log("done")
    }).catch(error => {
      console.log(error)
    })
  })


  res.send('done adding relations between skill and city')

})


app.get("/relations_employee_city", (req, res) => {


  const generator = new DataGenerator()
  console.log("these are the employees")
  console.log(employeeRecords)
  console.log("these are the skills")
  console.log(citiesRecords)

  employeeRecords.forEach((emp, idx) => {
    const quer = CypherQueryBuilder.createRelationToExistingNodes(emp, citiesRecords[idx % citiesRecords.length], {}, "Employee", "City", "LIVES_IN")
    console.log("this is the query")
    console.log(quer)
    testRunQueyry(quer).then(resp => {
      console.log("done")
    }).catch(error => {
      console.log(error)
    })
  })


  res.send('done adding relations between city and employee')

})


app.get("/relations_employee_availability", (req, res) => {


  const generator = new DataGenerator()


  employeeRecords.forEach((emp, idx) => {
    const level = Math.floor(Math.random() * 5 + 1)
    const quer = CypherQueryBuilder.createRelationToExistingNodes(emp, availabilitiesRecords[idx % availabilitiesRecords.length], {}, "Employee", "Availability", "HAS_STATUS")
    console.log("this is the query")
    console.log(quer)
    testRunQueyry(quer).then(resp => {
      console.log("done")
    }).catch(error => {
      console.log(error)
    })
  })


  res.send('done adding relations between availability and employee')

})


// ENDPOINTS TO MOCK DATA END


// ENDPOINTS TO QUERY DATA START


app.get('/employee', (req, res) => {
  const { opportunityName } = req.query
  const searchTerm = { opportunityName: "Network Administrator" }
  const query = CypherQueryBuilder.createMatchQueryWithRelationOpportunity(searchTerm)
  testRunQueyry(query).then(response => {
    const send = Utils.formatData(response.records, employeeAttributes)
    res.send(send)
  }).catch(error => {
    throw new Error(error)
  })

})

app.get('/opportunity', (req, res) => {
  const { city } = req.query
  const searchTerm = { cityName: "Munich" }
  const query = CypherQueryBuilder.createMatchQueryWithRelationCity(searchTerm)
  testRunQueyry(query).then(response => {
    const send = Utils.formatData(response.records, ["id", "opportunityName", "City"])
    res.send(send)
  }).catch(error => {
    throw new Error(error)
  })
})


// ENDPOINTS TO QUERY DATA END













const server = app.listen(3000)


// Handle normal shutdown
const gracefulShutdown = () => {
  console.log('Received kill signal, shutting down gracefully.');
  server.close(() => {
    console.log('Closed out remaining connections.');
    process.exit();
  });

  // If after a certain timeout, forcefully shut down
  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000); // 10 seconds
};

// Listen for termination signals
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
