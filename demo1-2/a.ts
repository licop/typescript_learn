interface Point {x: number, y: number}

function demo(data: Point) {
    console.log("11")
    return Math.sqrt(data.x ** 2 + data.y ** 2)
}

demo({x: 3, y: 5});
let count = 123;

// 函数不应该有返回值
function sayHello(): void {
    console.log('hello')
}
// 函数没有执行完成
function errorEmitter(): never {
    throw new Error();
    console.log(123);
}
// 解构参数
function getNumber({ first }: { first: number }) {
    return first
}


// interface Person {
//     name: 'string'
// }
// const rawData = '{"name": "licop"}';
// const newData: Person = JSON.parse(rawData);

// 赋予多种类型
let tem: number | string = 123;
tem = '456';

// 数组和元祖
const arr: (number | string)[] = [1, 2, 3];
const stringArr: string[] = ['a', 'b'];
const arr1: any[] = ['1', 'a'];

// 类型别名 type alias 
type User = {name: string, age: number} 
const objectArray: User[] = [{
    name: 'licop',
    age: 25
}]

// 元祖 tuple, 数组的长度和类型固定
const info: [string, string, number] = ['licop', 'nuoke', 25];
const list: [string, string, number][] = [
    ['licop', 'nuoke', 25],
    ['alle', 'tom', 27]
]

