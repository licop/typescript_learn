import cheerio from 'cheerio';

import fs from 'fs';

interface Info {
    title: string;
    count: number;
}
interface CourseResult {
    time: number,
    data: Info[]
}
interface Content {
    [propName: number]: Info[]
}

export default class Analyzer {
    private constructor() {
    }
    private static instance: Analyzer;

    static getInstance() {
        if(!Analyzer.instance) {
            Analyzer.instance = new Analyzer();
        }
        return Analyzer.instance
    }

    private getJsonInfo(html: string) {
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
        return {
            time: (new Date()).getTime(),
            data: infos
        }
    }
    private generateJsonContent(courseInfo: CourseResult, filePath: string) {
        let fileContent: Content = {};
        if(fs.existsSync(filePath)) {
            fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        }
        fileContent[courseInfo.time] = courseInfo.data;
        return fileContent;
    }

    public analyze(html: string, filePath: string) {
        const courseInfo = this.getJsonInfo(html);
        const fileContent = this.generateJsonContent(courseInfo, filePath)
        return JSON.stringify(fileContent);
    }
}
