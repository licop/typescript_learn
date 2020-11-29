class Person1 {
    protected name = 'licop';
    getName() {
        return this.name;
    }
}

class Teacher extends Person1 {
    getTeacherName() {
        return this.name;
    }
    // 通过super调用父类的方法
    getName() {
        return super.getName() + 'lee'
    }
}

const person1 = new Person1();
console.log(person1.getName);

// 访问类型 private, protected, public 访问类型
// public 允许我的类的内外被调用
// private 允许在类内被使用
// protected 允许在类内和继承的子类中使用


// contructor new实例的时候contructor会执行
class Person2 {
    // 简化写法
    constructor(public name: string) {

    }
} 

class Teacher2 extends Person2{
    constructor(public age: number) {
        // 子类的constuctor必须调用super()
        super('licop2') // 执行父类的constructor
    }
}

const teacher = new Teacher2(28);
console.log(teacher.age);
console.log(teacher.name);
