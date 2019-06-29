const express=require('express');
const router=express.Router()  ;

router.get('/',(req,res)=>{
    res.render('index',{title:'my demo',message:'this is message'});
})
module.exports=router;