//把所有的模块做统一处理
//导出一个统一的方法 useSTore
import React from 'react'
import LoginStore from "./login.store"
import UserStore from './user.store'
class RootStore{
	constructor(){
		this.loginStore=new LoginStore()
		this.useStore1=new UserStore()
	}
}

const rootStore=new RootStore()
const context=React.createContext(rootStore)

const useStore=()=>React.useContext(context)
export {useStore}