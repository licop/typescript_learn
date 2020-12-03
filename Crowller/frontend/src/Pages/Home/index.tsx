import React, { Component } from "react";
import {Button, message} from "antd";
import {Redirect} from 'react-router-dom';
import ReactEcharts from 'echarts-for-react'
import axios from 'axios';
import "./style.css";

class Home extends Component {
    state = {
        loaded: false,
        isLogin: true
    }

    componentDidMount() {
        axios.get('/api/isLogin').then((res) => {
            console.log(!res.data.data, 15);
            if(!res.data.data) {
                this.setState({
                    isLogin: false,
                    loaded: true
                })
            } else {
                this.setState({loaded: true})
            }
        })
    }
    
    handleLogoutClick = () => {
        axios.get('/api/logout').then((res) => {
            if(res.data.data) {
                this.setState({
                    isLogin: false,
                })
            } else {
                message.error('退出失败')
            }
        })
    }
    
    handleCrowllerClick = () => {
        axios.get('/api/getData').then((res) => {
            if(res.data?.data) {
                console.log(res.data)
                // this.setState({
                //     isLogin: false,
                // })
            } else {

            }
        })
    }

    handleShowClick = () => {
        axios.get('/api/showData').then((res) => {
            if(res.data?.data) {
                console.log(res.data)
                // this.setState({
                //     isLogin: false,
                // })
            } else {
            }
        })
    }

    getOptions = () => {

    }

    render() {
        const {isLogin, loaded} = this.state;
        if(isLogin) {
            if(loaded) {
                return (<div className="home-page">
                    <div className="buttons">
                        <Button type="primary" style={{ marginRight: '25px' }} onClick={this.handleCrowllerClick}>爬取</Button>
                        <Button type="primary" style={{ marginRight: '25px' }} onClick={this.handleShowClick}>展示</Button>
                        <Button type="primary" onClick={this.handleLogoutClick}>退出</Button>
                    </div>
                    <ReactEcharts option={this.getOptions}/>
                </div>)
            } else {
                return null;
            }
        } else {
            return <Redirect to="/login"/>
        }
    } 
}



export default Home;
