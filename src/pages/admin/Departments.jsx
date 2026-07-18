import React, {useEffect, useState} from 'react'


const Departments = () => {
  const [departments, setDepartments] = useState([])
  const [departmentName, setDepartmentName] = useState("")

  useEffect(() => {
    const savedDepartments = localStorage.getItem("departments")

    if (savedDepartments) {
      setDepartments(
        JSON.parse(savedDepartments)
      )
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("departmets", JSON.stringify(departments))
  }, [departments])
  
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!departmentName.trim()) return
    
    const newDepartment = {
      id: Date.now(),
      name: departmentName.trim(),
    }

    setDepartments([...departments, newDepartment])

    setDepartmentName("")
  }


  return (
    <div className='bg-white rounded-2xl shadow p-6 mt-6'>
      <h2 className='text-2xl font-bold mb-4'>
        Add Department
      </h2>

      <form
        onSubmit={handleSubmit}
        className='space-y-4'
      >
        <input
          type="text"
          placeholder='Enter Department Name'
          value={departmentName}
          onChange={(e) =>
            setDepartmentName(e.target.value)
          }
          className='w-full border p-3 rounded-xl'
          required
        />
        <button
          type='submit'
          className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl'
        >
          Add Department
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">
          Department List
        </h2>

        <div className="space-y-3">
          {departments.map((department) => (
          <div
          key={department.id}
          className="bg-white border rounded-xl p-4 flex justify-between items-center shadow-sm"
        >
          <span className="font-semibold">
            {department.name}
          </span>

        <div className="space-x-2">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg">
             Edit
           </button>

          <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg">
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
</div>
   </div>
  )
}

export default Departments