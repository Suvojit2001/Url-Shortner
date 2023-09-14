const express=require('express');
const { handleGenerateNewShortURL, redirectHandler,handleAnalytics } = require('../controllers/url');
const router=express.Router();

router.post('/',handleGenerateNewShortURL);
router.get('/:shortId',redirectHandler);
router.get('/analytics/:shortId',handleAnalytics)
module.exports=router