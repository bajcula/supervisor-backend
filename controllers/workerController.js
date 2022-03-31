const express = require('express')
const router = express()
const Worker = require('../models/worker')

router.get('/:id', async(req,res)=>{
    try{
        const workers = await Worker.find({user: req.params.id}).populate('user')
        console.log(workers)
        res.send({
            success: true,
            data: workers
        })
    }catch(err){
        res.send({
            success: false,
            data: err.message
        })
    }
})

router.post('/', async(req,res)=>{
    try{
        console.log(req.body.user)
        const newWorker = await Worker.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            department: req.body.department,
            salary: req.body.salary,
            age: req.body.age,
            goals: req.body.goals,
            bonusTracker:-2,
            user: req.body.user,
            img: req.body.img
        });
        res.send({
            success: true,
            data: newWorker
        })
    }catch(err){
        res.send({
            success: false,
            data: err.message
        })
    }
})

// router.get('/:id', async(req,res)=>{
//     try{
//         const worker = await Worker.findById(req.params.id)
//         if (!worker){
//             throw new Error('There is no such employee in our database.')
//         }
//         res.send({
//             success: true,
//             data: worker
//         })
//     }catch(err){
//         console.log(err)
//         res.send({
//             success: false,
//             data: err.message
//         })
//     }
// })

router.put('/:id', async(req,res)=>{
    try{
        const worker = await Worker.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.send({
            success: true,
            data: worker
        })
    }catch(err){
        res.send({
            success: false,
            data: err.message
        })
    }
})

router.delete('/:id', async(req,res)=>{
    try{
        const worker = await Worker.findByIdAndDelete(req.params.id)
        res.send({
            success: true,
            data: worker
        })
    }catch(err){
        res.send({
            success: false,
            data: err.message
        })
    }
})

module.exports = router;
