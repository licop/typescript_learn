// 普通方法，target 对应的是类的 prototype
// 静态方法，target 对应的是类的构造函数

function getNameDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
  console.log(target, key, descriptor.value);
  console.log(target.getName, 6)
  // descriptor.writable = true;
  descriptor.
  descriptor.value = function() {
    return 'decorator';
  };
}

class Test {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  @getNameDecorator
  getName() {
    return this.name;
  }
  getAge() {
    return 1;
  }
}

const test = new Test('dell');
console.log(test.getName(), 27);
