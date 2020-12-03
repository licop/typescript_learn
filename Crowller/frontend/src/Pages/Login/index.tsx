import React, { Component } from 'react';
import { Form, Input, Button, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import {Redirect} from 'react-router-dom';
import qs from 'qs';
import axios from 'axios';
import './style.css';

interface FormValue{
  password: string
}

class LoginForm extends Component {
  state = {
    isLogin: false
  }

  onFinish = (values: FormValue) => {
    axios
      .post(
        '/api/login',
        qs.stringify({
          password: values.password
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
      .then(res => {
        if (res.data?.data) {
          this.setState({
            isLogin: true
          });
        } else {
          message.error('登陆失败');
        }
    });
  };

  render() {
    const { isLogin } = this.state;
    
    return isLogin ? (<Redirect to="/" />) : (
        <div className="login-page">
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
          >
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
      </div>
    )
  }
  
};

export default LoginForm;

