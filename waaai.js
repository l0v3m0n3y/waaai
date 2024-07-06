class waaai{
    constructor(){
        this.api = "https://waa.ai/api"
        this.headers={"user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/73.0.3683.86 Chrome/73.0.3683.86 Safari/537.36","x-requested-with": "xmlhttprequest","content-type":"application/json"}
        this.api_key=null
    }
    async login(username,password){
        let req=await fetch(`${this.api}/auth/login`,{method:"POST",headers: this.headers,body:JSON.stringify({"username":username,"password":password})});
        let json=req.json()
        this.api_key=(json)["api_key"]
        this.headers["cookie"]=req.headers.get("set-cookie")
        return (json);
    }
    async add_email(email,password){
        let req=await fetch(`${this.api}/user/email`,{method:"POST",headers: this.headers,body:JSON.stringify({"email":email,"password":password})});
        return req.text();
    }
    async new_password(new_password,password){
        let req=await fetch(`${this.api}/user/passwd`,{method:"POST",headers: this.headers,body:JSON.stringify({"password":password,"newPassword":new_password,"newPasswordVerify":new_password})});
        return req.text();
    }
    async new_apikey(){
        let req=await fetch(`${this.api}/user/api-key`,{method:"POST",headers: this.headers});
        this.api_key=req.text()
        return this.api_key ;
    }
    async delete_all_links(){
        let req=await fetch(`${this.api}/user/passwd`,{method:"DELETE",headers: this.headers});
        return req.text();
    }
    async get_history(){
        let req=await fetch(`${this.api}/user/history?page=1&pageSize=10&search=`,{method:"GET",headers: this.headers});
        return req.json();
    }
    async short_url(url,customCode){
        let data={"longUrl":url,"unguessable":false}
        if(customCode) {data["customCode"]=customCode
        }
        let req=await fetch(`${this.api}/url/shorten`,{method:"POST",headers: this.headers,body:JSON.stringify(data)});
        return req.json();
    }
}
module.exports = {waaai};