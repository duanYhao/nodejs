function* func(){
    console.log('one')
    yield '1'
    console.log('two')
    yield '2'
    console.log('three')
    yield '3'
}
const f = func();
console.log(f)
// console.log('next',f.next())
// console.log('next',f.next())
// console.log('next',f.next())
// console.log('next',f.next())
for(const [key,value] of f){
    console.log(`${key}:${value}`)
}