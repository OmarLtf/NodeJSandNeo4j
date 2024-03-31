const {
    queryEmployeesByOpportunity, 
    queryOpportunitiesByCity, 
    queryEmployeesBySkills
  } = require('../endpoints/queryNodes');
  
const express = require("express")
const router = express.Router()

router.get('/employee', queryEmployeesByOpportunity)
router.get('/opportunity', queryOpportunitiesByCity)
router.get('/employees/skills', queryEmployeesBySkills)
router.get('/opportunities/city', queryOpportunitiesByCity)

module.exports = router