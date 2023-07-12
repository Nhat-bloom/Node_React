import { Button, MenuProps } from 'antd'
import { Link } from 'react-router-dom'
import { UserOutlined, PoweroffOutlined } from '@ant-design/icons'

type argsNav = {
   logout: () => void
}
export const itemsNav = ({ logout }: argsNav): MenuProps['items'] => [
   {
      key: '1',
      label: (
         <Link to={'/admin/profile'}>
            <UserOutlined /> Your Profile
         </Link>
      )
   },
   {
      key: '2',
      label: (
         <Button onClick={logout}>
            <PoweroffOutlined />
            Log out
         </Button>
      )
   }
]
