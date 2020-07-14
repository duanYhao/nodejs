test('测试helloworld',() => {
    const ret = require('../index')
    //断言
    expect(ret) 
        .toBe('hello world')
})

/**
 * 运行测试
 * jest helloworld
 * 
 * jest helloworld --watch
 * 监控改动执行测试
 */
    