import {NextFunction, Router} from 'express';
import Crowller from './utils/crowller';
import Analyzer from './utils/analyzer';
import {getResponseData} from './utils/util'
import fs from 'fs';
import path from 'path';

const router = Router();
const checkLogin = (req: any, res: any, next: any) => {
    const isLogin = req.session ? req.session.login : false;
    if(isLogin) {
        next()
        return;
    } else {
        res.send('请先登录');
    }
}

router.get('/api/logout', (req, res) => {
    if (req.session) {
      req.session.login = undefined;
    }
    res.json(getResponseData(true))
});

router.get('/api/isLogin', (req, res) => {
  const { password } = req.body;
  const isLogin = req.session ? req.session.login : false;
  res.json(getResponseData(isLogin));
});
  
router.post('/api/login', (req, res) => {
  const { password } = req.body;
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    res.json(getResponseData(true));
  } else {
    if (password === 'licop' && req.session) {
      req.session.login = true;
      res.json(getResponseData(true));
    } else {
      res.json(getResponseData(false, '登陆失败'));
    }
  }
});

router.get('/api/getData', checkLogin, (req, res) => {
    const secret = 'secretKey';
   const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
   const analyzer = Analyzer.getInstance();
   new Crowller(url, analyzer);
   res.json(getResponseData(true));
});

router.get('/api/showData', checkLogin, (req, res) => {
    try {
        const position = path.resolve(__dirname, '../data/course.json');
        const result = fs.readFileSync(position, 'utf8');
        res.json(getResponseData(JSON.parse(result)));
      } catch (e) {
        res.json(getResponseData(false, '数据不存在'));
    }
})

export default router
