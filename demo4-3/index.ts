// 类型断言 类型保护


interface Bird {
    fly: true,
    sing: () => {} 
}

interface Dog {
    fly: false,
    bark: () => {}
}

// 使用类型断言进行类型保护
function trainAnimal(animal: Bird | Dog) {
    if(animal.fly) {
        (animal as Bird).sing();
    } else {
        (animal as Dog).bark();
    }
}

// 使用in语法进行类型保护
function trainAnimalSecond(animal: Bird | Dog) {
    if('sing' in animal) {
        animal.sing();
    } else {
        animal.bark();
    }
}

// 使用typeof做类型保护
function add(a: number | string, b: number | string) {
    if(typeof a === 'string' || typeof b === 'string') {
        return `${a}${b}`
    }
    return a + b;
}

// 使用class和instaceof做类型保护
class NumberObj {
    count: number
}

function add1(first: object | Number, second: object | Number) {
    if(first instanceof NumberObj && second instanceof NumberObj) {
        return first.count + second.count
    }
    return 0
}
