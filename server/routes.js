var controller = require('./controller');
var path = require('path');

module.exports = function(app){
  app.get('/pets', controller.pets);
  app.get('/pet/:id', controller.pet_id);
  app.post('/create_pet', controller.create_pet);
  app.put('/update/:id', controller.update);
  app.delete('/delete/:id', controller.delete);
  app.get('/like/:id', controller.like);
  // app.get('/chat', function(req, res, next){
  //   req.io.emit('some_event');
  //   req.io.emit("some_other_event");
  // })
  app.all('*', (req, res, next) => {
    res.sendFile(path.resolve('./public/dist/public/index.html'))
  });
}
