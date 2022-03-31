const express = require('express')
const router = express()
const User = require('../models/user')

router.post('/', async(req,res)=>{
    try{
        const newUser = await User.create(req.body);
        res.send({
            success: true,
            data: newUser
        })
    }catch(err){
        res.send({
            success: false,
            data: err.message
        })
    }
})

router.post('/login', async(req,res)=>{
    try{
        const user = await User.findOne({email: req.body.email});
        if (!user){
            let err = 'There is no such user in our database.'
            res.send({
                success:false,
                data:err
            })
        } else {
            if (user.password === req.body.password) {
                res.send({
                    success: true,
                    data: user
                })
            } else {
                let err = 'Wrong password.'
                res.send({
                    success:false,
                    data:err
                })
            }
        }
    }catch(err){
        res.send({
            success: false,
            data: err.message
        })
    }
})

router.put('/:id', async(req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.send({
            success: true,
            data: user
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
        const user = await User.findByIdAndDelete(req.params.id)
        res.send({
            success: true,
            data: user
        })
    }catch(err){
        res.send({
            success: false,
            data: err.message
        })
    }
})

module.exports = router;
