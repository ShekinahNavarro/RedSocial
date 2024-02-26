import { createTask,onGetTask,updateTask,deleteTask, getTask } from "./firebase.js";

const taskForm = document.getElementById("create-form");
const tasksContainer = document.getElementById("tasks-container");

let id = "";
let editStatus= false;
let userGlobal;

export default function setupTask(user) {
    userGlobal = user;

    const userPhotoURL = userGlobal.photoURL;

    console.log(user);

     onGetTask((querySnapshot) => {
        let html = '';

        querySnapshot.forEach(doc => {
            const data = doc.data();
    

            html += `
                <div class="card mb-3 bg-warning-subtle">
                    <div class="card-body">
                        <p class="text-end">${data.date} ${data.hours}</p>
                        <div class="d-flex align-items-center">
                            <img src="${data.userPhotoURL}" class="me-2" style="width: 40px; height: 40px; border-radius: 50%;" />
                            <h6>${data.userName}</h6>
                        </div>
                        <h4 class="card-title">${data.title}</h4>
                        <p class="card-text">${data.description}</p>
                        <div class="row">
                            <button class='btn btn-danger btn-delete-custom mx-auto col-5 rounded-5 rounded-top-0"' data-id='${doc.id}'> <i class="bi bi-trash3"></i>  Delete </button>
                            <button class='btn btn-info btn-edit-custom mx-auto col-5 rounded-5 rounded-top-0"' data-id='${doc.id}'> <i class="bi bi-pencil-square"></i> Edit </button>
                        </div>
                    </div>
                </div>
            `;
        });

        tasksContainer.innerHTML = html;

        //DELETE
        const btnDelete = document.querySelectorAll(".btn-delete-custom");

        btnDelete.forEach(btn => {
            btn.addEventListener("click", ({target: { dataset }}) => deleteTask(dataset.id));
        });

        //UPDATE
        const btnEdit = document.querySelectorAll(".btn-edit-custom");
        btnEdit.forEach(btn=> {
            btn.addEventListener("click",async ({target : {dataset}}) => {
                const doc = await getTask(dataset.id);
                const task = doc.data();

                taskForm["task-title"].value =task.title;
                taskForm["task-content"].value = task.description;

                editStatus = true;
                id = doc.id;

                taskForm['btn-task-save'].innerHTML='update';

                //LOGICA DE UPDATE

            });
        });
     });
};

//CREATE

taskForm.addEventListener("submit", (e) => {

    e.preventDefault();

    //OBTENER EL NOMBRE

    const userName = userGlobal.displayName;

    //foto
    const userPhotoURL = userGlobal.photoURL;

     //FECHA
     const date = getFormattedDate(new Date ());

     //HORA
     const hours = getFormattedHour( new Date());


    const title = taskForm["task-title"].value;
    const description = taskForm["task-content"].value;
    //SI NO ESTOY EDITANDO EL BOTON SIRVE PARA CREAR
    if (!editStatus){
        createTask(title,description,userName,date,hours,userPhotoURL);
    }
    else{
        updateTask(id, ({
         title: title,
         description: description,
        }));
        
        editStatus = false;
        taskForm['btn-task-save'].innerHTML = 'create';
    }


    taskForm.reset();
});

function getFormattedDate(date) {
    var year = date.getFullYear();
  
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
  
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    
    return day + '/' + month + '/' + year;
  } 

function getFormattedHour(date) {
    var hours = date.getHours().toString().padStart(2, '0');
    var minutes = date.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
}