import 'reflect-metadata'

function showData(target: typeof User) {
    for(let key in target.prototype) {
        const data = Reflect.getMetadata('data', target.prototype, key);
        console.log(data);
    }
}

@showData
class User {
    @Reflect.metadata('data', 'test')
    getName() {}

    @Reflect.metadata('data', 'test')
    getAge() {}
}
