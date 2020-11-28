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

