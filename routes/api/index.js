const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

router.use('./user', userRoutes);
router.use('./thought', thoughtRoutes);

module.exports = router; 

// const Thoughts = require('./thought');
// const Users = require('./user');


// module.exports = { user, thought };