import { makeAutoObservable } from "mobx"
import { http } from "@/utils"

class ChannelStore{
	channelList=[]
	constructor(){
		makeAutoObservable(this)
	}
	// channelList 频道在article和publish组件中都要用到，那么什么时候发送请求获取数据呢？？---layout组件
	getChannelList=async()=>{
		const res=await http({url:'/channel',method:"get"})
		// this.channelList=res.data.data
		this.channelList=[
			{key:0,value:'C++'},
			{key:1,value:'Python'},
			{key:2,value:'Javascript'}
		]//模拟数据
	}
}

export {ChannelStore}