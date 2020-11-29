// ts -> .d.ts 翻译文件 -> js

import superagent from 'superagent';

class Crowller {
    private secret = 'x3b174jsx';
    private url = `https://bbs.hupu.com/all-gambia`;
    private rawHtml = '';
    
    constructor() {
        this.getRawHtml()
    }

    async getRawHtml() {
        const result = await superagent.get(this.url);
        this.rawHtml = result.text;
    }
}

const crowller = new Crowller();

