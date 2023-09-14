const shortid = require('shortid');
const URL= require('../models/url');

exports.handleGenerateNewShortURL= async(req,res)=>{
    const body=req.body;
    if(!body.url){
        return res.status(400).json({
            success:false,
            message:"url is required"
        })
    }
    const shortId=shortid();
    const result=await URL.create({
        shortId:shortId,  
        redirectUrl:body.url,
        // visitHistory:[],
    });
    return res.status(200).json({
        success:true,
        id:result.shortId
    })
}

exports.redirectHandler=async(req,res)=>{
    try {
        const shortId=req.params.shortId;
        const result= await URL.findOneAndUpdate({shortId},{$push : {
                                                                    visitHistory:{
                                                                        timestamp:new Date()
                                                                    }}
                                                            }, {new:true})
         console.log(result)
         res.redirect(result.redirectUrl);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success:false,
            error:error.message
        })
    }
  
}

exports.handleAnalytics=async(req,res)=>{
    try {
        const shortId=req.params.shortId;
        const result= await URL.findOne({shortId})
        res.status(200).json({
            success:true,
            TotalClicks:result.visitHistory.length,
            analytics:result.visitHistory
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success:false,
            error:error.message
        })
    }
   
}