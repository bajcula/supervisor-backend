const express = require('express')
const router = express()
const Worker = require('../models/worker')

router.get('/', async(req,res)=>{
    try{
        const workers = await Worker.find()
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
        const newWorker = await Worker.create(req.body);
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

router.get('/:id', async(req,res)=>{
    try{
        const worker = await Worker.findById(req.params.id)
        if (!worker){
            throw new Error('There is no such employee in our database.')
        }
        res.send({
            success: true,
            data: worker
        })
    }catch(err){
        console.log(err)
        res.send({
            success: false,
            data: err.message
        })
    }
})

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
