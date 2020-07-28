// test('callback',done => {
//     const { callback }  = require('../index.js')
//     callback()
//     //延迟1s结束
//     setTimeout(() => {
//         done
//     }, 100);
// })

// test('promise',done => {
//     const { promise }  = require('../index.js')
//     promise()
//     //延迟1s结束
//     setTimeout(() => {
//         done
//     }, 100);
// })

test('Gnerator',done => {
    const { generator }  = require('../index.js')
    generator()
    //延迟1s结束
    setTimeout(() => {
        done
    }, 100);
})