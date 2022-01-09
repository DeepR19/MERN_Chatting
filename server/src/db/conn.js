const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const Grid =require("gridfs-stream");

dotenv.config({path: "./config.env"});
const DB = process.env.DB;

// no deprecation warning
mongoose.connect(DB,
    { useNewUrlParser: true ,
        useUnifiedTopology: true ,
        useCreateIndex: true ,
        useFindAndModify: false
    }).then(() => {
        console.log("MongoDB Done");
    }).catch((e) => {
        console.log(e);
    });

    // let gfs;
    // const conn =mongoose.connection;
    // conn.once('open',()=>{
    //   gfs=Grid(conn.db, mongoose.mongo);
    //   gfs.collection('photos');
    // })
    

