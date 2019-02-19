let router = require('express').Router();



router.get('/',function(req,res){
    res.json({
        status:'API , Its Working',
        message: 'Welcome to REST api and express crafted with love!'
    });
});

// Import contact controller
var contactController = require('./controllers/contactController');
// Contact routes
router.route('/contacts')
    .get(contactController.landing)
    .post(contactController.new);

router.route('/contacts/:contact_id')
      .get(contactController.view)     
      .delete(contactController.delete)
      .patch(contactController.update)
      .put(contactController.update)

module.exports = router;