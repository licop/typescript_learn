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

router.get('/', (req, res) => {
    const isLogin = req.session ? req.session.login : false;
    if (isLogin) {
      res.send(`
        <html>
          <body>
            <a href='/getData'>爬取内容</a>
            <a href='/showData'>展示内容</a>
            <a href='/logout'>退出</a>
          </body>
        </html>
      `);
    } else {
      res.send(`
        <html>
          <body>
            <form method="post" action="/login">
              <input type="password" name="password" />
              <button>登陆</button>
            </form>
          </body>
        </html>
      `);
    }
});

router.get('/logout', (req, res) => {
    if (req.session) {
      req.session.login = undefined;
    }
    res.redirect('/');
  });
  
router.post('/login', (req, res) => {
    const { password } = req.body;
  const isLogin = req.session ? req.session.login : false;
  if (isLogin) {
    res.json(getResponseData(false, '已经登陆过'));
  } else {
    if (password === '123' && req.session) {
      req.session.login = true;
      res.json(getResponseData(true));
    } else {
      res.json(getResponseData(false, '登陆失败'));
    }
  }
});

router.get('/getData', checkLogin, (req, res) => {
    const secret = 'secretKey';
   const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
   const analyzer = Analyzer.getInstance();
   new Crowller(url, analyzer);
   res.json(getResponseData(true));
});

router.get('/showData', checkLogin, (req, res) => {
    try {
        const position = path.resolve(__dirname, '../data/course.json');
        const result = fs.readFileSync(position, 'utf8');
        res.json(getResponseData(JSON.parse(result)));
      } catch (e) {
        res.json(getResponseData(false, '数据不存在'));
    }
})

export default router
