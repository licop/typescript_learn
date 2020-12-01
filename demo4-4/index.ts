// 枚举类型
enum Status {
    OFFLINE,
    ONLINE,
    DELETED
}


function getResult(status: number) {
    if(status === Status.OFFLINE) {
        return 'offline'
    } else if(status === Status.ONLINE){
        return 'online'
    } else if(status === Status.DELETED) {
        return 'deleted';
    }
    return 'error';
}

console.log(getResult(1));