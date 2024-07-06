# waaai
JavaScript library for waa.ai
# main
```js
async function main(){
    const {waaai} = require('./waaai');
    const waa= new waaai();
    await waa.login("log","password")
    let req=await waa.short_url("url")
    console.log(req)
}
main()
```
