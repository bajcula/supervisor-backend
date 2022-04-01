const express = require('express')
const router = express()
const User = require('../models/user')
const bcrypt = require('bcryptjs');

router.post('/', async(req,res)=>{
    try{
        const newUser = await User.create({
            firstName: req.body.firstName,
            lastName:req.body.lastName,
            email: req.body.email,
            img: req.body.img,
            password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
        });
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
            if (bcrypt.compareSync(req.body.password, user.password)) {
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
        console.log(err)
        res.send({
            success: false,
            data: err.message
        })
    }
})

router.put('/:id/updatepassword', async(req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        if (bcrypt.compareSync(req.body.oldPass, user.password)) {
            user.password = bcrypt.hashSync(req.body.newPass, bcrypt.genSaltSync(10))
            user.save()
            res.send({
                success: true,
                data: user
            })
        } else {
            res.send({
                success:false,
                data: "Your old password doesn't match with our database record."
            })
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
