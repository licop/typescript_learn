// ts -> .d.ts 翻译文件 -> js
import superagent from 'superagent';
import cheerio from 'cheerio';

interface Info {
    title: string;
    count: number;
}

class Crowller {
    private secret = 'x3b174jsx';
    private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`;
    private rawHtml = '';
    
    constructor() {
        this.getRawHtml()
    }

    getJsonInfo(html: string) {
        const $ = cheerio.load(html);
        const items = $('.course-item');
        const infos: Info[] = [];
        items.map((index, item) => {
            const descs = $(item).find('.course-desc');
            const title = descs.eq(0).text();
            const count = Number(descs.eq(1).text().split('：')[1]);
            infos.push({
                title,
                count
            })
        })
        const result = {
            time: (new Date()).getTime(),
            data: infos
        }
        console.log(result);
    }

    async getRawHtml() {
        const result = await superagent.get(this.url);
        this.getJsonInfo(result.text);
    }
}

const crowller = new Crowller();

