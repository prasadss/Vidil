const mongoose=require('mongoose');
module.exports=function (req,res,next){
    if(!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.sendStatus(400).send('Invalid ID');

    next();
}