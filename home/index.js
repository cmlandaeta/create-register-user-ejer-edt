const formC = document.querySelector('#form-create');
const formL = document.querySelector('#form-login');
const loginInput = document.querySelector('#login-input');
const createInput = document.querySelector('#create-input');
const notificacion = document.querySelector('.notification');


formC.addEventListener('submit',async e=>{

    e.preventDefault();

  const respuesta = await  fetch('http://localhost:3000/users',{
    method: 'GET'
  });

  const users = await respuesta.json();

  // valida que el usuario si exista
  const user = users.find(user => user.nombre === createInput.value); 

 console.log(user);

  // validaciones

  if(!createInput.value){ //valida que el campo no este vacio
    // si entra esta vacio el campo

   // console.log('Esta vacio el campo');
    notificacion.innerHTML = "El usuario no puede estar vacio";
    notificacion.classList.add('show-notification')

    setTimeout(() => {
        notificacion.classList.remove('show-notification');
        
    }, 2000);

  }else if(user){
    // existe el usuario
    
    //console.log('si existe el usuario');

    notificacion.innerHTML = "El usuario ya existe";
    notificacion.classList.add('show-notification')

    setTimeout(() => {
        notificacion.classList.remove('show-notification');
        
    }, 2000);

  }else{
    await  fetch('http://localhost:3000/users',{
        method: 'POST',
        headers: {

            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nombre: createInput.value})
      });

      notificacion.innerHTML = `El usuario para${createInput.value} ha sido creado`
      notificacion.classList.add('show-notification');
    
      setTimeout(() => {
        notificacion.classList.remove('show-notification');
        
       }, 2000);
    
    createInput.value="";
   
  }



})


formL.addEventListener('submit', async e => {
    e.preventDefault();

    const respuesta = await fetch('http://localhost:3000/users',{
        method: 'GET',

    });

const users = await respuesta.json();

const user = users.find(user=>user.nombre === loginInput.value  );



/// falta 

if(!user) {

    // si no existe
    notificacion.innerHTML = "El usuario no existe";
    notificacion.classList.add('show-notification');
    setTimeout(()=>{
        notificacion.classList.remove('show-notification');

    }, 2000)
}else {
    localStorage.setItem('user',JSON.stringify(user));
    window.location.href = '../tareas/tareas.html'
}

})

