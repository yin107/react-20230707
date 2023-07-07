//先把所有的工具函数导出的模块在这里导入
// 之后再统一导出

import {http} from './http'
import {
	setToken,
	getToken,
	removeToken
} from './token'


export {
	http,
	setToken,
	getToken,
	removeToken
}


//其他组件导入时  import {http} from '@/utils'