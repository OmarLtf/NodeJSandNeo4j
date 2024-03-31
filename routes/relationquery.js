const {
    queryCitiesWithOpportunities, 
    queryOpportunitiesWithAvailabilities, 
    queryCitiesWithAvailabilities
  } = require('../endpoints/queryRelationships');
  
const express = require ("express")
const router = express.Router()


router.get("/cities-opportunities", queryCitiesWithOpportunities)
router.get("/opportunities-availabilities", queryOpportunitiesWithAvailabilities)
router.get("/cities-availabilities", queryCitiesWithAvailabilities)

module.exports = router