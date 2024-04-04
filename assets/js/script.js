// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    const currentTime = dayjs().unix();
    const rndNum = Math.floor(Math.random() * 1000);
    return currentTime+rndNum;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
 
   const taskCard = $('<div>').addClass('card draggable my-3').attr('task-id',task.id);

   const cardHeader = $('<div>').addClass('card-header h4').text(task.title);
   const cardBody = $('<div>').addClass('card-body');
   const cardDescription = $('<p>').addClass('card-text').text(task.description);
   const cardDueDate = $('<p>').addClass('card-text').text(task.due);
   const cardDeleteBtn = $('<button>')
    .addClass('btn btn-danger delete')
    .text('Delete')
    .attr('task-id', task.id);
    
 cardDeleteBtn.on('click', handleDeleteTask);

 const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');
 if (dayjs().isSame(taskDueDate, 'day')) {
  taskCard.addClass('bg-warning text-white');
} else if (dayjs().isAfter(taskDueDate)) {
  taskCard.addClass('bg-danger text-white');
  cardDeleteBtn.addClass('border-light');
}
cardBody.append(cardDescription,cardDueDate, cardDeleteBtn);
taskCard.append(cardHeader,cardBody);
return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  //getting all the task
  taskList = JSON.parse(localStorage.getItem("tasks")) || [];
  const todoList = $('#todo-cards');
  todoList.empty();

  const inProgressList = $('#in-progress-cards');
  inProgressList.empty();

  const doneList = $('#done-cards');
  doneList.empty();

//  console.log(taskList)

  for(let i=0; i < taskList.length; i++){
    let task = taskList[i];
    console.log(task)
    if (task.status === 'to-do') {
      todoList.append(createTaskCard(task));
      console.log("to do");
    } else if (task.status === 'in-progress') {
      inProgressList.append(createTaskCard(task));
      console.log("in progress");
    } else if (task.status === 'done') {
      doneList.append(createTaskCard(task));
      console.log("done");
    }
  
  }
  $('.draggable').draggable({
    opacity: 0.7,
    zIndex: 100,
    // ? This is the function that creates the clone of the card that is dragged. This is purely visual and does not affect the data.
    helper: function (e) {
      // ? Check if the target of the drag event is the card itself or a child element. If it is the card itself, clone it, otherwise find the parent card  that is draggable and clone that.
      const original = $(e.target).hasClass('ui-draggable')
        ? $(e.target)
        : $(e.target).closest('.ui-draggable');
      // ? Return the clone with the width set to the width of the original card. This is so the clone does not take up the entire width of the lane. This is to also fix a visual bug where the card shrinks as it's dragged to the right.
      return original.clone().css({
        width: original.outerWidth(),
      });
    },
  });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
  const taskId = generateTaskId();
  const taskName = $('#taskName').val();
  const dueDate = $('#dueDate').val();
  const taskDescription = $('#taskDescription').val();

  // Add your logic to handle the task data here
  newTask = {
    id: taskId,
    title: taskName,
    due: dueDate,
    description: taskDescription,
    status: 'to-do',
  };
  taskList.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(taskList));
  // Close the modal after form submission
  const modal = $('#formModal');
  modal.modal('hide');

  renderTaskList();
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
  const taskId = $(this).attr('task-id');
  console.log("handleDeleteTask : " + taskId);
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // ? Remove task from the array. There is a method called `filter()` for this that is better suited which we will go over in a later activity. For now, we will use a `forEach()` loop to remove the project.
  tasks.forEach((task) => {
    if (task.id == taskId) {
      tasks.splice(tasks.indexOf(task), 1);
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
  });
  renderTaskList();


}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  const taskList = JSON.parse(localStorage.getItem("tasks")) || [];
  // ? Get the project id from the event
  const taskId = ui.draggable[0].dataset.taskId;

  // ? Get the id of the lane that the card was dropped into
  const newStatus = event.target.id;
 
  for (let task of taskList) {
    // ? Find the project card by the `id` and update the project status.
//    if (task.id === taskId) {
      task.status = newStatus;
 //   }
  } 
  // ? Save the updated tasks array to localStorage (overwritting the previous one) and render the new project data to the screen.
  localStorage.setItem('tasks', JSON.stringify(taskList));
  renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
 
        // Get the modal element
        const modal = $('#formModal');
      
        // Get the button that opens the modal
        const openModalBtn = $('#openModal');
      
        //display datepicker
        $('#dueDate').datepicker();
        // Get the form element
        const taskForm = $('#taskForm');
      
        //reset the field when modal was hiding
        $('#formModal').on('hidden.bs.modal', function () {
          $(this).find('form').trigger('reset');
      })
        // When the button is clicked, show the modal
        openModalBtn.click(function() {
          modal.modal('show');
        });
      
        // When the form is submitted, handle the task addition logic
        taskForm.submit(function(event) {
          event.preventDefault();

          handleAddTask(event);

        }); 
        renderTaskList();
       
          // ? Make lanes droppable

    $('.lane').droppable({
      accept: '.draggable',
      drop: handleDrop,
    });
});
