const express = require("express");
const{Server} = require("socket.io");
const app = express();
const PORT = process.env.PORT || 8080



//servidor express
const server = app.listen(PORT, ()=>console.log(`corriendo en el puerto ${PORT}`));


//servidor de ws y lo conectamos con el sv express
const io = new Server(server);

app.use(express.static(__dirname+"/public"));
const historial = [];

io.on("connection",(socket)=>{
    console.log("nuevo usuario conectado", socket.id);
    socket.broadcast.emit("newUser");
    socket.emit("historico",historial)
    socket.on("message", data=>{
        console.log(data);
        historial.push(data);
        io.sockets.emit("historico", historial);
    })
})

