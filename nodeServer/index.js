//Node server which will handle socket io connections
const io = require('socket.io')(8000) //any port

const users = {};

//io server will listen incoming event

//it is an instance which listen all socket connections
//If anyone joins lets all connected user know!
io.on('connection',socket=>{
    //it defines a particular connection (accepting event)
    socket.on('new-user-joined',name =>{
        //provide a key to user
        // console.log("New User",name)
        users[socket.id]=name;
        socket.broadcast.emit('user-joined',name);
    });

    //broadcast msg to all users
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message: message, name: users[socket.id]})
    });

    //send a left msg , disconnect is buildin function
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
})