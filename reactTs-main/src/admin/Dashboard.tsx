import { message } from 'antd'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Dashboard = () => {
   const navigate = useNavigate()
   useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user')!)
      if (!user || user.role !== 'admin') {
         message.warning('Only for admin!', 20)
         navigate('/')
      }
   }, [])
   return <div>Dashboard</div>
}

export default Dashboard
