import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { completeTask } from '../../redux/slices/taskSlice';

const MyTasks = () => {

  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks)

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Completed':
        return { color: 'green' };

      case 'Pending':
        return { color: 'orange' };

      default:
        return {};
    }
  };
  return (
    <div>
      <h2>My Tasks</h2>
      
            {tasks.length === 0 ? (
              <p>No tasks found.</p>
            ) : (
              tasks.map((task) => (
                <div key={task.id}>
                  <p>Title: {task.title}</p>
      
                  <p style={getStatusStyle(task.status)}>
                    Status: {task.status}
                  </p>
      
                  {task.status === 'Pending' && (
                    <>
                      <button
                        onClick={() =>
                          dispatch(completeTask(task.id))
                        }
                      >
                        Task Completed
                      </button>
                    </>
                  )}
      
                  <hr />
                </div>
              ))
            )}
    </div>
  )
}

export default MyTasks