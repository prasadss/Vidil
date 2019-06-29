const jwt=require('jsonwebtoken'); 
function auth(req,res,next)
{
    if(!req.user.isAdmin) return res.status(403).send('forbidden');
    next(); 
}
module.exports=auth;