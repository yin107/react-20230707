import { makeAutoObservable } from "mobx";
import { http } from "@/utils";

class UserStore{
	userInfo={data:{name:''}}//mobx是严格模式，先默认一个值，防止报错
	constructor(){
		makeAutoObservable(this)
	}
	getUserInfo=async()=>{
		const res=await http.get('/user/profile')
		this.userInfo=res.data
	}
}


export default UserStore