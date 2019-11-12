// 斐波那契数列

function fabonacci(n) {
    if (n === 0) {
        return 0;
    }
    if (n === 1) {
        return 1;
    }
    return fabonacci(n - 1) + fabonacci(n - 2);
}

function fabonacci2(n) {
    if (n === 0) return 0
    if (n === 1) return 1
    let a, b, c
    for (a = 0, b = 1, c = a + b; n > 2; n--) {
        a = b
        b = c
        c = a + b
    }
    return c
}

onmessage = function (messageEvent) {
    switch (messageEvent.data) {
        case 'start':
            console.time('fabonacci')
            let result = fabonacci2(43);
            postMessage(result);
            console.timeEnd('fabonacci')
    }
}



// const I = 30
// {
//     console.time('fabonacci2')
//     let i = I
//     while (i-- > 0) console.log(i, fabonacci2(i))
//     console.timeEnd('fabonacci2')
// }
// {
//     console.time('fabonacci')
//     let i = I
//     while (i-- > 0) console.log(i, fabonacci(i))
//     console.timeEnd('fabonacci')
// }
