import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, message } from 'antd';
import { Chart, LineAdvance, Point, Line, Tooltip } from 'bizcharts'; 
import moment from 'moment'
import axios from 'axios';
import './style.css';

interface CourseItem {
    title: string,
    count: number
}

interface LineAdvanceItem {
    title: string,
    count: number,
    date: string
}

interface State {
    loaded: boolean;
    isLogin: boolean;
    data: {
      [key: string]: CourseItem[];
    };
  }

class Home extends Component {
  state: State = {
    loaded: false,
    isLogin: true,
    data: {}
  };

  componentDidMount() {
    axios.get('/api/isLogin').then(res => {
      if (!res.data?.data) {
        this.setState({
          isLogin: false,
          loaded: true
        });
      } else {
        this.setState({
          loaded: true
        });
      }
    });

    axios.get('/api/showData').then(res => {
        if (res.data?.data) {
            this.setState({
              data: res.data.data
            });
        }  
    })
  }

  handleLogoutClick = () => {
    axios.get('/api/logout').then(res => {
      if (res.data?.data) {
        this.setState({
          isLogin: false
        });
      } else {
        message.error('退出失败');
      }
    });
  };

  handleCrowllerClick = () => {
    axios.get('/api/getData').then(res => {
      if (res.data?.data) {
        message.success('爬取成功');
      } else {
        message.error('退出失败');
      }
    });
  };
  
//   "1606643055196": [
//     { "title": "Vue2.5开发去哪儿网App", "count": 26 },
//     { "title": "React 16.4 开发简书项目", "count": 19 },
//     { "title": "React服务器渲染原理解析与实践", "count": 45 },
//     { "title": "手把手带你掌握新版Webpack4.0", "count": 18 }
//   ],
//   "1606643479246": [
//     { "title": "Vue2.5开发去哪儿网App", "count": 38 },
//     { "title": "React 16.4 开发简书项目", "count": 84 },
//     { "title": "React服务器渲染原理解析与实践", "count": 33 },
//     { "title": "手把手带你掌握新版Webpack4.0", "count": 61 }
//   ]
  getOptions = () => {
    const { data } = this.state;
    const lineAdvanceData: LineAdvanceItem[] = []
    for(let i in data) {
        const item = data[i];
        item.forEach((subItem) => {
            lineAdvanceData.push({
                title: subItem.title, 
                count: subItem.count, 
                date: moment(Number(i)).format('MM-DD HH:mm')
            })
        })
    }
   
    return lineAdvanceData
  }

  render() {
    const { isLogin, loaded } = this.state;
    if (isLogin) {
      if (loaded) {
        return (
          <div className="home-page">
            <div className="buttons">
              <Button type="primary" style={{ marginRight: '25px' }} onClick={this.handleCrowllerClick}>
                爬取
              </Button>
              <Button type="primary" onClick={this.handleLogoutClick}>
                退出
              </Button>
            </div>
            <Chart  padding={[30, 20, 50, 40]} autoFit height={320} data={this.getOptions()} interactions={['element-active']}>
                <Point position="date*count" color="title" shape='circle' />
                <Line shape="smooth" position="date*count" color="title" label="count" />
                <Tooltip shared showCrosshairs />
            </Chart>
          </div>
        );
      }
      return null;
    }
    return <Redirect to="/login" />;
  }
}

export default Home;
