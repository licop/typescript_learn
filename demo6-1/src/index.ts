// 类的装饰器
// 装饰器本身是个函数
// 装饰器通过 @ 符号来使用
function testDecorator<T extends new (...args: any[]) => any>(constructor: T) {
    return class extends constructor{
        name = 'lee'
    }
}

@testDecorator
class Test {
    name: string;
    constructor(name: string) {
        this.name = name;
    }
}
const test = new Test('dell');
console.log(test);
