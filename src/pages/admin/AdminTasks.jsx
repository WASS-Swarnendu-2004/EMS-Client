import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTask } from '../../redux/slices/taskSlice'

const AdminTasks = () => {
  const [title, setTitle] = useState("")
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: Date.now(),
      title,
      status:"Pending"
    }
    dispatch(addTask(newTask))

    setTitle("")
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='Enter task title'
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />
        <button type='submit'>Create Task</button>
      </form>
    </div>
  )
}

export default AdminTasks