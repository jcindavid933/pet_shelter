var Pet = require('./models.js');

module.exports = {
  pets: function(request,response){
    Pet.find({}, function(err, pet){
      if(err){
        response.json({errors: err});
      }
      else{
        response.json(pet);
      }
    }).sort({type: 1});
  },

  like: function(request, response){
    Pet.findByIdAndUpdate(request.params.id, {$inc: {like: 1}}, function(err){
      if(err){
        response.json({errors:err});
      }
      else{
        response.json({success: 'success'});
      }
    })
  },

  pet_id: function(request, response){
    Pet.find({_id: request.params.id}, function(err, pet){
      if(err){
        response.json({errors: err});
      }
      else{
        response.json(pet);
      }
    })
  },

  create_pet: function(request, response){
    Pet.count({name: request.body.name}, function(err, count){
      if (err){
        response.json({errors: err});
      }
      else if(count > 0){
        response.json({error: "This pet name already exists"});
      }
      else{
        var pet = new Pet(request.body);
        pet.save(function(err){
          if(err){
            console.log(err);
            response.json({errors: err});
          }
          else{
            response.json({message: "Success", pet: pet});
          }
        })
      }
    })
  },

  update: function(request, response){
    Pet.findByIdAndUpdate(request.params.id, request.body,  {runValidators: true}, function(err, author){
      if(err){
        response.json({errors: err});
      }
      else{
        response.json({message: "Success"});
      }
    })
  },

  delete: function(request, response){
    Pet.remove({_id: request.params.id}, function(err){
      if(err){
        response.json({errors: err});
      }
      else{
        response.json({message: "Success"});
      }
    })
  },

}
