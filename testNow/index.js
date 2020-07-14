const path = require('path')
const fs = require('fs')
module.exports = class TestNow{
    /**
     * 生成测试代码
     */
    getTestSource(methodName,classFile,isClass = false){
        console.log('getTestSource:'+methodName)
        return `
test('${'TEST '+methodName}',() => {
    const ${isClass?'{'+methodName+'}':methodName} = require('${'../'+classFile}')
    const ret = ${methodName}();
    //expect(ret)
    //  .toBe('test return)
})
        `
    }

    /**
     * 生成测试文件名
     * @param {*} filename 代码文件名
     */
    getTestFileName(filename){
        const dirName = path.dirname(filename)
        const baseName = path.basename(filename);
        const extName = path.extname(filename)
        const testName = baseName.replace(extName,`.spec${extName}`)
        return path.format({
            root:dirName+'/__test__/',
            base:testName
        });
    }


    /**
     * 
     */
    getJestSource(sourcePath = path.resolve('./')){
        const testPath = `${sourcePath}/__test__`
        if(!fs.existsSync(testPath)){
            fs.mkdirSync(testPath)
        }
        //遍历代码文件
        let list = fs.readdir(sourcePath)
        list.map(v => `${sourcePath}/${v}`)//添加完整路径
            .filter(v => fs.statSync(v).isFile())//过滤文件
            .filter(v => v.indexOf('.spec') === -1)//排除测试代码
            // .map(v => this.genTestFile(v))
    }

    genTestFile(filename){
        console.log('filename:',filename);
        const testFileNmae = this.getTestFileName(filename);
        //判断次文件是不是已存在
        if(fs.existsSync(testFileNmae)){
            console.log('该测试代码已存在',testFileNmae)
            return ;
        }
        const mod = require(filename)
        let source 
        if(typeof mod === 'object'){
            source = Object.keys(mod)
                .map(v => this.getJestSource(v,path.basename(filename),true))
                .join('\n')
        }else if(typeof mod === 'function'){
            const basename = path.basename(filename)
            source = this.getTestSource(basename.replace('.js'),basename)
        }
        fs.writeFileSync(testFileNmae,source)

    }

    
}