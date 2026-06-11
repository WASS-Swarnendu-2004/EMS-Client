import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'
import ProtectedRoutes from './ProtectedRoutes'
import EmployeeDashboard from '../pages/employee/EmployeeDashboard'
import MyTasks from '../pages/employee/MyTasks'
import ApplyLeave from '../pages/employee/ApplyLeave'
import LeaveHistory from '../pages/employee/LeaveHistory'
import Profile from '../pages/employee/Profile'
import EmployeeLayout from '../layout/EmployeeLayout'
import AdminLayout from '../layout/AdminLayout';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminLeaves from '../pages/admin/AdminLeaves';
import AdminTasks from '../pages/admin/AdminTasks';
import Employees from '../pages/admin/Employees'

const AppRoutes = () => {
  return (
      <Routes> 
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
       <Route element={<ProtectedRoutes />}>
         <Route path='/employee' element={<EmployeeLayout />}>
           <Route path="dashboard" element={<EmployeeDashboard />} />
           <Route path="mytasks" element={<MyTasks/>} />
           <Route path="applyleave" element={<ApplyLeave/>} />
           <Route path="leavehistory" element={<LeaveHistory />} />
           <Route path="profile" element={<Profile />} />
        </Route>
        <Route path='/admin' element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="leaves" element={<AdminLeaves />} />
          <Route path="employees" element={<Employees />} />
          <Route path="tasks" element={<AdminTasks />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default AppRoutes