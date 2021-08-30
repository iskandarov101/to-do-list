import { useState, useEffect } from 'react';
import TodoItem from './components/TodoItems/Index';

function App() {

  const [ todoText, setTodoText ] = useState('')

  const [ todoList, setTodoList ] = useState([]);

  const handleSubmit = (e)=> {
    if(todoText.length > 0) {
      todoList.push({
        id: todoList.length > 0 ? todoList[todoList.length - 1].id + 1 : 0,
        title: todoText
      });
      window.localStorage.setItem('todos', JSON.stringify(todoList))
    }
    setTodoText('');
    e.preventDefault()
  }

  const handleSave = ()=> {
    alert('Saved')

    window.localStorage.setItem('todos', JSON.stringify(todoList));
  }

  const handleDeleteAll = ()=> {
    setTodoList([]);
    window.localStorage.removeItem('todos')
  }

  const handleDelete = (id)=> {
    let deletingItemIndex = todoList.findIndex(todo => todo.id === id);
    todoList.splice(deletingItemIndex, 1)
    window.localStorage.setItem('todos', JSON.stringify(todoList));
    setTodoList(JSON.parse(window.localStorage.getItem('todos')))
  }

  useEffect(()=> {
    if(window.localStorage.getItem('todos')){
      setTodoList(JSON.parse(window.localStorage.getItem('todos')))
    }
  }, [])

  return (
    <div className="container">
      <div className='row'>
        <div className='col-md-3'>

        </div>
        <div className='col-md-6'>
          <div className='card mt-5'>
            <div className='card-header'>
              <h1>Qaytlar soni: {todoList.length}</h1>
            </div>

           

            <div className='card-body'>
              <form  className='d-flex' onSubmit={handleSubmit} >
                <input 
                className='form-control me-3' 
                type="text" 
                value={todoText}
                onChange={(e)=> setTodoText(e.target.value)}
                />
                <button type='button' className="btn btn-success">Add</button>
              </form>
              <TodoItem.Group>
                {
                  todoList.map((item, index)=> (
                    <TodoItem.Option 
                    title={item.title}
                    key={index}
                    id={item.id}
                    handleDelete={handleDelete}
                    />
                  ))
                }
              </TodoItem.Group>
            </div>
            <div className='card-footer d-flex justify-content-end'>
              <button className="btn btn-danger me-3" onClick={handleDeleteAll}>Clear</button>
              <button className="btn btn-primary" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
        <div className='col-md-3'>

        </div>

      </div>
    </div>
  );
}

export default App;
