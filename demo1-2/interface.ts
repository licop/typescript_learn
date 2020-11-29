// interface只能代表对象和函数，无法代表基础类型; 类型别名可以代表任意类型
interface Person  {
    name: string;
    readonly age?: number; // ?表示非必须
    [propName: string]: any;
    say(): string
}
// 接口继承
interface Teacher extends Person {
   teach(): string    
}
// 定义函数类型
interface SayHi {
    (word: string): string
}

const getPersonName = (person: Person) => {
    console.log(person.name);
}
const setPersonName = (person: Person, name: string) => {
    person.name = name;
}

const person = {
    name: 'licop', 
    sex: 'male',
    say() {
        return 'say hello'
    }
};

getPersonName(person);

class User1 implements Person {
    name: 'dell';
    say() {
        return 'hello'
    }
}
