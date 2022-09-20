const express = require('express')
const workoutController = require('../controllers/workoutController')
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()

//require auth for all workout routes
router.use(requireAuth)



//GET all workouts
router.get('/', workoutController.getWorkouts)



//GET a single workout
router.get('/:id', workoutController.getWorkout)


//POST a new workout
router.post('/', workoutController.createWorkout)


//DELETE a workout
router.delete('/:id', workoutController.deleteWorkout)



//UPDATE a workout
router.patch('/:id', workoutController.updateWorkout)

module.exports = router