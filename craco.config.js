// 添加自定义别名
const path=require('path')
const {whenProd,getPlugin,pluginByName}=require('@craco/craco')
module.exports={
	webpack:{
		alias:{
			// eslint-disable-next-line no-undef
			'@':path.join(__dirname,'src')
		},
		//配置CDN
		cnfigure:(webpackConfig)=>{
			let cdn={
				js:[],
				css:[]
			}
			// 只有生产环境下配置--开发环境下的cdn是可以直接用的
			whenProd(()=>{
				webpackConfig.externals={
					react:"React",
					'react-dom':'ReactDOM'
				}
				cdn={
					js:['https://cdn.bootcdn.net/ajax/libs/react/17.0.2/umd/react.production.min.js','https://cdn.bootcn.net/ajax/libs/react-dom/17.0.2/umd/react-dom.production.min.js'],
					css:[]
				}
			})
			const {isFound,match}=getPlugin(
				webpackConfig,
				pluginByName('HtmlWebpackPlugin')
			)
			if(isFound){
				// 找到了HtmlWebpackPlugin插件
				match.userOptions.cdn=cdn
			}
			return webpackConfig
		}
	}
}