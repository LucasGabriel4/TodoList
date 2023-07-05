import React from 'react'
import '../src/TodoList.css'
import useLocalStorage from './useLocalStorage'

function TodoList() {
    const [value, setValue] = React.useState('')
    const [editvalue, setEditValue] = React.useState('')
    const [openEdit, setOpenEdit] = React.useState(false)
    const [todos, setTodos] = useLocalStorage('todos', [])
    const [index, setIndex] = React.useState(null)
    const inputAddTodo = React.useRef()
    const liElement = React.useRef()



    function getTodoValue({target}){
       setValue(target.value)
       
    }

    function getEditValue({target}){
        setEditValue(target.value)
    }

    function addTodoItemList(){
       if(value.length === 0){
        setTodos([...todos])
       }else{
         setTodos([...todos, value])
         setValue('')
       } 
     
    }

    function removeTodo(target){
        const deleteValue = target.parentNode.previousElementSibling.textContent;
        const filterTodos = todos.filter((todo) => todo !== deleteValue)
        setTodos([...filterTodos])
    }

    function doneTodo(target){
        const todoItem = target.parentNode.parentNode
        todoItem.classList.toggle('active')
    }


    function editTodo(target){
        setOpenEdit(!openEdit)
        const oldValue = target.parentNode.previousElementSibling.textContent;
        setEditValue(oldValue)
        const indexTodo = + target.parentNode.parentNode.dataset.index;
        setIndex(indexTodo)
    }


    function finishEdit(){
      const [spanElement] = Array.from(liElement.current.children)
    
     if(todos.includes(spanElement.textContent)){
        todos.splice(index,1,editvalue)
        setTodos([...todos])
        setOpenEdit(false)
     }
     
    }


   

    function optionsTodo({target}){
      const trash = target.dataset.option === 'trash' ? true : false ;
      const done = target.dataset.option === 'done' ? true : false ;
      const edit = target.dataset.option === 'edit' ? true : false;
     
       if(trash){
          removeTodo(target)
       }


       if(done){
          doneTodo(target)
       }

       if(edit){
          editTodo(target)
       }
  
       
    }


  const openEditTodo = openEdit === true ? 'active' : '';

  return (
    <section className='todo__container'>
        <h1 className='todo__title'>Todo List</h1>

        <div className="todo__add-item">
            <input ref={inputAddTodo} type='text' value={value} onChange={getTodoValue}></input>
            <button onClick={addTodoItemList}>Adicionar</button>
        </div>

        <div className={`todo__add-item todo__edit ${openEditTodo}`}>
            <input type='text' value={editvalue} onChange={getEditValue}></input>
            <button onClick={finishEdit}>Editar</button>
        </div>

        <div className='todo__items-list' onClick={optionsTodo}>
           <ul>
               {todos.map((todo, index) => (
                     <li ref={liElement} key={index} data-index={index} className='todo__item'>
                            <span>{todo}</span>
                            <div className='todo__icons'>
                                <i data-option='done' className="ph ph-check-fat"></i>
                                <i data-option='edit' className="ph ph-pencil"></i>
                                <i data-option='trash' className="ph ph-trash"></i>
                            </div>
                       </li>
                   ))}
           </ul>
        </div>
      
        
    </section>
  )
}

export default TodoList
