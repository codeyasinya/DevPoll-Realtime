const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ya700362_db_user:yasiN12345@cluster0.v86opjc.mongodb.net/')
.then(()=>console.log ('connect to MongoDB'))
.catch(err => console.error('connection error:',err));


const express = require('express');
const http = require('http');
const cors = require('cors');
const {Server} = require('socket.io');
const { connect } = require('http2');
const app = express();
app.use(cors({origin : "*",
    methods: ["GET","POST"]
}));
const server = http.createServer(app);
const io = new Server(server, {
    cors : {
        origin : "*",
        methods: ["GET", "POST"]

    }
});
let votes = {
    JavaScript: 0,
    Python: 0,
    CPlusPlus: 0,
};
io.on('connection',(socket)=>{
    console.log('A user connected: '+ socket.id);
    
    

socket.emit('updateVotes',votes);
socket.on('castVote',(option)=>{
    if(votes.hasOwnProperty(option))
    {
        votes[option] +=1;
        io.emit('updateVotes',votes);

    }
    });

    
socket.on('disconnect', () =>{
        console.log('User disconnected');
    });
});

server.listen(5000, () =>{
    console.log('server running on port 5000');
});
