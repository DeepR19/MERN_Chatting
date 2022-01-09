const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const app = express();
const server = http.createServer(app);
const bodyparser = require('body-parser');

const io = socketio(server, { cors :{origin :'*'}});
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

// middlewares
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use(bodyparser.json());
app.use(fileUpload())

// link DB
require("./src/db/conn");

  // socket here
io.on("connection", (socket) => {
    socket.emit("me", socket.id);
    console.log(socket.id);

    socket.on("callUser", ({ userToCall, signalData, from, name }) => {
        io.to(userToCall).emit("callUser", {
            signal: signalData,
            from,
            name,
        });
    });

    socket.on("updateMyMedia", ({ type, currentMediaStatus }) => {
        console.log("updateMyMedia");
        socket.broadcast.emit("updateUserMedia", { type, currentMediaStatus });
    });

    socket.on("msgUser", ({ name, to, msg, sender }) => {
        io.to(to).emit("msgRcv", { name, msg, sender });
    });

    socket.on("answerCall", (data) => {
        socket.broadcast.emit("updateUserMedia", {
            type: data.type,
            currentMediaStatus: data.myMediaStatus,
        });
        io.to(data.to).emit("callAccepted", data);
    });
    socket.on("endCall", ({ id }) => {
        io.to(id).emit("endCall");
    });
});
// changes


// link router page
app.use(require("./src/route/router"));
const PORT = process.env.PORT || 5000;




server.listen(PORT, () => {
    console.log(`Server is started on port ${PORT}`);
})



