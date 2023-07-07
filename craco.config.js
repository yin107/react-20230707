// 添加自定义别名
const path=require('path')
module.exports={
	webpack:{
		alias:{
			// eslint-disable-next-line no-undef
			'@':path.join(__dirname,'src')
		}
	}
}