// ts -> .d.ts 翻译文件 -> js
import superagent from 'superagent';
import fs from 'fs';
import path from 'path';

interface AnalyzerType {
    analyze: (html: string, filePath: string) => string;
}

export default class Crowller {
    private filePath = path.resolve(__dirname, '../../data/course.json');
    
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
        console.log(this.filePath, fileContent)

        this.writeFile(fileContent)
    }

}

