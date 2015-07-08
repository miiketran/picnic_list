var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = {
  show: function(req,res){
    User.findOne(
        {'profile_id': req.user.profile_id}, 
        function(err,result){
        if(err){
            console.log(err);
        } else {
            // console.log(result);
            res.json(result);
        }
    })
  }

}