const {
    addSkillEmployeeRelations, 
    addCityOpportunityRelations, 
    addOpportunitySkillRelations, 
    addEmployeeAvailabilityRelations, 
    addEmployeeCityRelations
  } = require('../endpoints/relatoinshipsEstab');
  

const express = require("express")
const router = express.Router()

router.get("/skill_employee", addSkillEmployeeRelations)
router.get("/city_opportunity", addCityOpportunityRelations)
router.get("/opportunity_skill", addOpportunitySkillRelations)
router.get("/employee_city", addEmployeeCityRelations)
router.get("/employee_availability", addEmployeeAvailabilityRelations)

module.exports = router