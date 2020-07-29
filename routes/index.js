const express = require('express');
const router = express.Router();
const passport = require('passport')
const {ensureAuth, ensureGuest} = require('../middleware/auth_check')
const User = require('../models/User')
const Note = require('../models/note')

//Login page
// GET /
router.get('/', ensureGuest,(req, res)=>{
    res.render('login',{
        layout:false,
        name:'Shakhriyor'
    })
})

// Homepage
// Get /homepage
// router.get('/homepage',ensureAuth, (req,res)=>{ 
//     // console.log(req.body)
//     Note.find({user:req.user.id}).lean().then(notes=>{
//         console.log(req.body)
//         res.render('homepage', {
//             layout:false,
//             notes:notes,
//             user:req.user
            
//         })
//     }).catch(er=>{
//         console.log(er)
//     })
// })
router.get('/homepage',ensureAuth, async(req,res)=>{ 
    try{
    const notes = await Note.find({user:req.user.id}).lean()
    const user = await User.findById(req.user.id).lean()
    console.log(user)
    res.render('homepage', {
        layout:false,
        notes:notes,
        user:user
    })
    }catch(er){
        console.log(er)
    }
       
})





module.exports = router
router.get('/db/notes', (req,res)=>{ 
    
    Note.find({user:req.user.id}).lean().then(notes=>{
        
        res.send(notes)
            
        
    }).catch(er=>{
        console.log(er)
    })
})
router.post('/db/notes', (req,res)=>{
    console.log(req.body)
    const note = new Note({
        title:req.body.title,
        body:req.body.body,
        user:req.user.id,
        createdDate:req.body.createdDate,
        noteID:req.body.noteID,
        //editedTime:req.body.editedDate
    })
    note.save().then(success=>{
        console.log("Added!")
    })
    
    res.redirect('/homepage')
})

router.put('/db/notes/:id',  async (req, res)=>{
    try{
        console.log('NoteID:', req.params.id)
    const note = await Note.findOneAndUpdate({noteID:req.params.id}, req.body)
    console.log('Edited', note)
    res.send(note)

    }catch(er){
        res.send(er)
    }
   
})

router.delete('/db/notes/:id', (req,res)=>{
    console.log(req.body)
    Note.findOneAndDelete({noteID:req.params.id}).then(success=>{
        console.log('Success Deleted!!!!!!', success)
        res.send(success)
    }).catch(er=>{
        console.log(er)
    })
})

router.get('/user', (req, res)=>{
    res.send(req.user)
})