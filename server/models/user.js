var mongoose = require('mongoose');
var Schema = mongoose.Schema;
  ObjectId = Schema.ObjectId;

  var UserSchema = new Schema({
      displayName:  String,
      profile_id:  String,
      dateAdded: {type: Date, default: Date.now}
  });

  mongoose.model('User', UserSchema);
