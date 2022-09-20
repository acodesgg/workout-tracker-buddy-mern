const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

//get all workouts
exports.getWorkouts = async (req, res) => {
    const user_id = req.user._id
    const workouts = await Workout.find({user_id}).sort({createdAt: -1})

    res.status(200).json(workouts)
}

//get a single workout
exports.getWorkout = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout"})
    }

    const workout = await Workout.findById(id)

    try{
        res.status(200).json(workout)
    }catch{
        return res.status(404).json({error:"No such workout"})
    }
}

//create a new workout
exports.createWorkout = async (req, res) => {
    const { title, reps, load } = req.body

    let emptyFields = []

    if (!title){
        emptyFields.push('title')
    }
    if (!load){
        emptyFields.push('load')
    }
    if (!reps){
        emptyFields.push('reps')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error : 'Please fill in all the fields', emptyFields})
    }
    //add doc to db
    try {
        const user_id = req.user._id
        const workout = await Workout.create({ title, reps, load, user_id})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

//delete a workout
exports.deleteWorkout = async(req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout"})
    }

    try{
        const workout = await Workout.findOneAndDelete({_id: id})
        res.status(200).json(workout)
    }catch{
        return res.status(404).json({error: "No such workout"})
    }
}

//update a workout
exports.updateWorkout = async(req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such workout"})
    }

    try{
        const workout = await Workout.findByIdAndUpdate({_id: id},{
            ...req.body
        })
        res.status(200).json(workout)
    }catch{
        return res.status(404).json({error: "No such workout"})
    }
}

