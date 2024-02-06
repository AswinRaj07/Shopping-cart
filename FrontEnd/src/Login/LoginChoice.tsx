
import { FunctionComponent } from 'react'
import { UserOutlined } from '@ant-design/icons';
import React from 'react';
import { Avatar, Space } from 'antd';
import classes from './LoginChoicestyl.module.scss'

const url = 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg';
const LoginChoice:FunctionComponent = () => {
  return (
    <div>
    <div className={classes.productPage}>
      <div className={classes.container}>


     <div> 
     <Avatar  style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>user</Avatar>
     <h3>User</h3>
      </div> 
   
  
 
   
   
  


   <div>
 <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
 <h3>Admin</h3>
 </div>
      </div>
     
    </div>
    </div>
  )
}

export default LoginChoice
