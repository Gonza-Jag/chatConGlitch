console.log("js funcionando")

const socketCliente= io();

let user;

Swal.fire({
    title:"Hola usuario",
    text:"bienvenido, ingrese su usuario",
    input:"text",
    allowOutsideClick:false
}).then(respuesta=>{
    user = respuesta.value;
});

const campo = document.getElementById("messageField")

campo.addEventListener("keydown",(evt)=>{
    console.log(evt.key)
    if(evt.key == "Enter"){
        socketCliente.emit("message", {username:user,
        message:campo.value})
    }

})

const messageContainer = document.getElementById("messageContainer")


socketCliente.on("historico",(data)=>{
    let elementos = "";
    data.forEach(item=>{
        elementos = elementos + `<p><strong>${item.username}</strong>:${item.message}</p>`;

    });
    messageContainer.innerHTML = elementos;
})

socketCliente.on("newUser",()=>{
    Swal.fire({
        text:"nuevo usuario conectado",
        toas:true
    })
})