import { useRef, useState } from "react";
const Option = ({title, id, handleDelete})=> {
  const [ inputText, setInputText ] = useState(title);
  const [ isDisabled, setIsDisabled ] = useState(true);
  const inputRef = useRef(null)

  const handleEditFocus = ()=> {
    setIsDisabled(false)
    
    setTimeout(()=> {
      inputRef.current.focus()
    }, 0)
  }

  const handleEdit = (e) => {
    if(e.charCode === 13 ) {
      setIsDisabled(true)

      let allItems = JSON.parse(window.localStorage.getItem('todos'))
      let editingEl = allItems.find(todo => todo.id === id);
      let editingElIndex = allItems.findIndex(todo => todo.id === id);
      let editedElement = {
        ...editingEl,
        title: inputText
      }
      allItems.splice(editingElIndex, 1, editedElement)
      window.localStorage.setItem('todos', JSON.parse([...allItems]))
    }
  }
  return(
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <input 
      onChange={(e)=> setInputText(e.target.value)}
      onBlur={()=> setIsDisabled(true)} 
      onKeyPress={handleEdit}
      ref={inputRef} type="text" 
      disabled={isDisabled} 
      value={inputText} 
      className='input-todo'
      />
      
      <div>
        <button className='btn btn-outline-primary me-3' onClick={handleEditFocus}>Change</button>
        <button className='btn btn-outline-danger' onClick={()=> handleDelete(id)}>Delete</button>
      </div>
    </li>
  )
}

export default Option;