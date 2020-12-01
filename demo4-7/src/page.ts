import {Header, Content, Footer, User} from './components'


export default class Page {
    user: User = {
      name: 'licop'
    }
    constructor() {
      new Header();
      new Content();
      new Footer();
    }
  }
