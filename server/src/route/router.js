const express = require('express');
const multer = require('multer');
// const GridFsStorage = require('multer-gridfs-storage');
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");
// const path = require('path')

require("../db/conn");
const Register = require("../models/usersSchema");
const Message = require("../models/Message");



// 
    // const storage = new GridFsStorage({
    //     url: process.env.DB,
    //     options:{useNewUrlParser: true, useUnifiedTopology: true},
    //     file:(req,file)=>{
    //         const match = ['image/png','image/jpeg'];

    //         if(match.indexOf(file.mimetype) === -1){
    //             const filename = `${Date.now()}-any-name-${file.originalname}`;
    //         }

    //         return{
    //             bucketName: 'photos',
    //             filename: `${Date.now()}-any-name-${file.originalname}`
    //         }
    //     }
    // })

    // let upload = multer({
    // storage: storage
    // }).single('file');


    // router.post('/upload', upload, (req, res)=>{
    //     if(req.file === undefined) return res.send("You must select a file..");
    //     const imgUrl = `http://localhost:3000/file/${req.file.filename}`
    //     return res.send(imgUrl)
    // })

    
// 








// express-fileupload start
// save image in folder

// router.post('/upload',(req, res, next) => {
//     let img = req.files.file;

//     img.mv('src/upload/'+img.name , (e)=>{
//         if(e){
//             res.json({'status':'file not uploaded'});
//         }
//         else{
//             res.json({'status':'recorded inserted successfully'});
//         }
//     });
// });


// express-fileupload end



























// Multer start

// router.use(express.static(__dirname+'../upload/'));

// let Storage = multer.diskStorage({
//     destination:'../upload/',
//     filename: (req, file, cb)=>{
//         cb(null, file.filename+" "+Date.now()+path.extname(file.originalname));
//     }
// });
// let upload = multer({
//     storage: Storage
// }).single('file');


// router.get('/upload', (req, res)=>{
//     res.send("Send Save");
// })

// multer end















let appUser=[];

const addUser = (userId, email, name) => {
    !appUser.some((user) => user.email === email) &&
    appUser.push({ userId, email, name });
  };

router.get("/", (req, res) => {
    res.status(200).json({message: "Hello To MSREN CHAT webApp"});
});

router.get("/about",auth, (req,res) => {
    res.send(req.rootUser); 
    // console.log("ABOUT");
});

// give data to contact and Home page
router.get("/getdata",auth, (req,res) => {
    // console.log("GEtData");
    res.send(req.rootUser); 
});

// Get Feedback from Users
router.post("/contact", auth, async (req,res) => {
    try{
        const {firstname,  email,  message} = req.body;

        if(!firstname|| !email|| !message){
            return res.json({error: "plz fill contact form"});
        }
        const contactUser = await Register.findOne({_id: req.userID});

        if(contactUser){
            const userMessage = contactUser.addMessage(firstname, email, message);
            res.status(201).json({message: "Feedback Send!!!"});
        }
    }catch(e){
        res.json({error: "contact Error"})
    }
});


router.get("/room",auth, (req, res) => {

    addUser(req.rootUser._id, req.rootUser.email, req.rootUser.firstname);
    res.send( appUser );

});

//add friends to DB
router.post("/conversation", async (req,res) => {
    let {sender, userInfo} = req.body;
  
    try{
        const user = await Message.findOne({             
            members: { $all : [sender.userId, userInfo.userId]}
        });
        if(user){
            res.status(200).json({message: "Alerady Exist"});

        }else{
             const conversation = new Message({
                members: [sender.userId, userInfo.userId],
                senderName: [sender.name, userInfo.name],
            });

            const cdata = await conversation.save();
            res.status(200).json(cdata);
        }
    }catch(e){
        console.log(e)
    }
    
});

// find friends of sender
router.get("/conversation",auth, async (req, res)=> {
    try{
        let com = String(req.userID);

        const conUser = await Message.find({
            members: { $in: [com]}
        });
        res.send(conUser)
    }catch(e){
        console.log("get--",e)
    }
})

// save messages to DB
router.post("/message", async (req,res) => {
    const {sender, receiver, text} = req.body;
    try{
        const user = await Message.findOne({             
                members: { $all : [sender.userId, receiver.userId]}
            })

        if(user){
            const mess =await user.addmap(sender.userId,text);
            res.send(mess);
        }
    }catch(e){
        console.log(e)
    }
});

// find messages of sender and receiver
router.post("/users", async (req, res)=> {
    let {sender, receiver} = req.body;

    try{
        const isExist = await Message.findOne({
            members: { $all : [sender.userId, receiver.userId]}
        });

        if(isExist){
            const mess = isExist.messages
            res.send(mess);
        }
    }catch(e){
        res.send(e);
    }
})

// get all users 
router.get("/register", async (req, res)=>{
    try {
        const reg = await Register.find();
        res.send(reg)
    } catch (error) {
        console.log(error)
    }
})

// create a user in DB
router.post("/register", async (req, res) => {
    userData = req.body;
    const {firstname, lastname, email, phone, password, confirmpassword} = req.body;

    if(!firstname|| !lastname || !email ||!phone ||!password|| !confirmpassword){
        return res.status(422).json({error: "plz Fill All"});
    }

   try{
        let userExist = await Register.findOne({email});

        if(userExist){
            return res.status(422).json({error: "Email already Exist"});
        }
        else if(password !== confirmpassword){
            return res.status(422).json({error: "Password Not Matching"});
        }
        else{
            const user  = new Register({firstname, lastname, email, phone, password, confirmpassword});
            await user.save();
            res.status(201).json({message: "successfull"})
        }
   }catch(e){
       res.status(400).send(e);
   }
});

// login user using DB
router.post("/login", async (req, res) => {
    
    try{
            let token;
            const {name, email, password } = req.body;

            if(!name ||!email||! password ){
                return res.status(400).json({error: "plz Fill All"});
            }     
            const loginUser = await Register.findOne({email});

            if(loginUser){
                const isMatch = await bcrypt.compare(password, loginUser.password)          
                token = await loginUser.generateToken();

                res.cookie("jwtoken",token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly: true
                });

                    if(!isMatch){
                        res.status(400).json({error: "Invalid Credentials"});
                        
                    }else{
                        res.status(200).json({message: "User Login Successfully"});
                    }
                }
                else{
                    res.status(400).json({error: "Invalid Credentials"});
                }    
        }catch(e){
            console.log(e)
        }
});

router.get("/logout", (req,res) => {
    res.clearCookie('jwtoken', {path: '/'});
    res.status(200).send("User Logout");
});

module.exports = router;