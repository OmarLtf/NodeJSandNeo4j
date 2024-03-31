const {
    addEmployees,
    addSkills,
    addCities,
    addOpportunities,
    addAvailabilities
  } = require('../endpoints/dataGeneration'); 

const express = require('express')
const router = express.Router()

router.get("/employees", addEmployees)
router.get("/skills", addSkills)
router.get("/cities", addCities)
router.get("/opportunities", addOpportunities)
router.get("/availabilities", addAvailabilities)

module.exports = router