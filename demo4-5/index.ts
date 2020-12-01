// 函数泛型
function join<T>(a: T, b: T) {
   return `${a}${b}`
}

join<string>('1', '1')

// 类泛型
