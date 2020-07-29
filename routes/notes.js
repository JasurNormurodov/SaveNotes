const express = require('express');
const router = express.Router();
const passport = require('passport')
const Note = require('../models/note')

//add page
// GET /
router.get('/add', (req, res)=>{
    console.log(req.params)
    res.render('add',{layout:false})
})


// Post  for adding note
router.post('/add',(req, res)=>{
    // console.log(req.body)
    // console.log(req.body.title)
    // console.log(req.user.id)
    // req.body.user = req.user.id
    // console.log(req.body.user)
    // console.log(req.user)
    const note = new Note({
        title:req.body.title,
        body:req.body.body,
        user:req.user.id,
    })
    note.save().then(success=>{
        console.log("Added!")
    })
    
    res.redirect('/homepage')
} )

// router.get('/edit?/:title',(req,res)=>{
//     Note.findOne({title:req.params.title}).then(note=>
//         {
//             res.render('add', {note})
//         }).catch(er=>{
//             console.log(er)
//         })
// })

// Edit

router.put('/edit/:title', (req,res)=>{
    console.log(req.body)
    if(req.body.ftitle==req.params.title){
        console.log(req.body)
        Note.findOneAndUpdate({title:req.params.title},{
            $set:{
                body:req.body.myBody,
                editedTime:req.body.edited
            }
        }).then(success=>{
            console.log(success)
            res.redirect('/homepage')
        }).catch(er=>{
            console.log(er)
        })
    }else{
        Note.findOneAndUpdate({body:req.body.myBody},{
            $set:{
                title:req.body.ftitle,
                editedTime:req.body.edited

                
            }
        }).then(success=>{
            // console.log(success)
            res.redirect('/homepage')
        }).catch(er=>{
            console.log(er)
        })
    }
    
})

router.delete('/delete/:title', (req,res)=>{
    console.log(req.body)
    Note.findOneAndDelete({title:req.body.ftitle}).then(success=>{
        console.log('Success Deleted!!!!!!')
        res.redirect('/homepage')
    }).catch(er=>{
        console.log(er)
    })
})


module.exports = router