// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {

}

// Todo: create a function to create a task card
function createTaskCard(task) {

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

        // Get the modal element
        const modal = $('#formModal');
      
        // Get the button that opens the modal
        const openModalBtn = $('#openModal');
      
        // Get the form element
        const taskForm = $('#taskForm');
      
        // When the button is clicked, show the modal
        openModalBtn.click(function() {
          modal.modal('show');
        });
      
        // When the form is submitted, handle the task addition logic
        taskForm.submit(function(event) {
          event.preventDefault();
          const taskName = $('#taskName').val();
          const taskDescription = $('#taskDescription').val();
          
          // Add your logic to handle the task data here
          
          // Close the modal after form submission
          modal.modal('hide');
        });
      


});
