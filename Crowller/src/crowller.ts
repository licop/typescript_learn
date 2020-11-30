// ts -> .d.ts 翻译文件 -> js
import superagent from 'superagent';
import fs from 'fs';
import Analyzer from './analyzer';
import path from 'path';

interface AnalyzerType {
    analyze: (html: string, filePath: string) => string;
}

class Crowller {
    private filePath = path.resolve(__dirname, '../data/course.json');

    constructor(private url: string, private analyzer: AnalyzerType) {
        this.initSpiderProcess()
    }
    // 取数据
    async getRawHtml() {
        const result = await superagent.get(this.url);
        return result.text;
    }
    // 写数据
    writeFile(content: string) {
        fs.writeFileSync(this.filePath, content);
    }
    
    async initSpiderProcess() {
        const html = await this.getRawHtml();
        const fileContent = this.analyzer.analyze(html, this.filePath);
        this.writeFile(fileContent)
    }

}
const secret = 'x3b174jsx';
const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
const analyzer = Analyzer.getInstance();
const crowller = new Crowller(url, analyzer);
