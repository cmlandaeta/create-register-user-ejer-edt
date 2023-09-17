const user = JSON.parse(localStorage.getItem('user'));


//console.log(user);

if(!user){
    //caso de que el usuario no este en LS
    window.location.href = '../home/index.html';
}

const formulario = document.querySelector('#form-todos');
const lista = document.querySelector('#todos-list');
const inputF = document.querySelector('#form-input');
const cerrarBtn = document.querySelector('#cerrar-btn');



formulario.addEventListener('submit', async e =>{

    e.preventDefault();

    await fetch ('http://localhost:3000/tareas',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
            // envia la tarea creada a db.json

        body:JSON.stringify({text:inputF.value,nombre:user.nombre}) // text y nombre son atributos del objeto tarea

    })

   obtenerLista()

})

const obtenerLista = async() =>{

    const respuesta = await fetch ('http://localhost:3000/tareas',{
        method: 'GET'

    });
    const list = await respuesta.json(); // se pasa a Json la consulta del fecth
    const userList = list.filter(lista => lista.nombre === user.nombre); // se valida si en el filter el nombre en el JSON si es igual al usuario logueado
    //console.log(userList)

    userList.forEach(i => {
        const listado = document.createElement('li');
        listado.innerHTML = `
        <li id=${i.id} class="todo-item">
        <button class="delete-btn">&#10006;</button>
        <p class="${i.checked ? 'check-todo': false}">${i.text} </p>
        <button class="check-btn">&#10003;</button>
      </li>
        
        `;
        lista.appendChild(listado);
    })
}

obtenerLista() // llamno la funcion para que se carge la lista al registrar el usuario

cerrarBtn.addEventListener('click', async e => {
    localStorage.removeItem('user')
    window.location.href = '../home/index.html';
})

lista.addEventListener('click', async e => {
    if(e.target.classList.contains('delete-btn')){
        //console.log('eliminar')

        const id = e.target.parentElement.id; // esta parado en prueba en html y tiene que bucar el id del elemento padre
       // console.log(id)

            await fetch(`http://localhost:3000/tareas/${id}`, { // borrar la tarea por el id
                method: 'DELETE'
            });

            e.target.parentElement.remove();

    }else if(e.target.classList.contains('check-btn')){
       // console.log('check')
       const id = e.target.parentElement.id;
       //console.log(id)

       const respuestaJSON = await fetch(`http://localhost:3000/tareas/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({checked:e.target.parentElement.classList.contains('check-todo')?false:true}) // ingresa la propiedad check a las las propiedades tareas
       });

       const response = await respuestaJSON.json();

       console.log(response); // muestra los false y true si la propiedad esta checked

       e.target.parentElement.classList.toggle('check-todo');


    }
})