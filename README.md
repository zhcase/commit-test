文档地址：http://182.61.5.204:9000/

# 日常办公

##### 项目规范

此手册主要实现的目标：代码一致性和最佳实践

前端规范小册地址:http://182.61.5.204:3000/

## 负责人信息

<details>
<summary>展开查看</summary>
<pre><code>.
.
├── build                    
├── mock                      
├── public                    
│   │── favicon.ico           
│   └── index.html           
├── src                       
│   ├── api                    
│   ├── assets                
│   ├── components             
│   │   │   └── Activiti
│   │   │       └── Owner: zehua
│   ├── icons                
│   ├── layout
│   │   │   └── Owner: xxx               
│   ├── router                
│   ├── store                 
│   ├── utils                 
│   ├── vendor               
│   ├── views  
│   │   │   ├── invoice/
│   │   │   │   └── Owner: 陈龙庭
│   │   │   ├── workhandover/
│   │   │   │   └── Owner: 胡程勇
│   ├── App.vue               
│   ├── main.js               
│   └── permission.js         
├── tests                      
├── .env.xxx                   
├── .eslintrc.js             
├── .babelrc                   
├── .travis.yml              
├── vue.config.js            
├── postcss.config.js          
└── package.json              
</code></pre>
</details>

## 目录结构

<details>
<summary>展开查看</summary>
<pre><code>.
.
├── build                      # 构建相关
├── mock                       # 项目mock 模拟数据
├── public                     # 静态资源
│   │── favicon.ico            # favicon图标
│   └── index.html             # html模板
├── src                        # 源代码
│   ├── api                    # 所有请求
│   ├── assets                 # 主题 字体等静态资源
│   ├── components             # 全局公用组件
│   ├── icons                  # 项目所有 svg icons
│   ├── layout                 # 全局 layout
│   ├── router                 # 路由
│   ├── store                  # 全局 store管理
│   ├── utils                  # 全局公用方法
│   ├── vendor                 # 公用vendor
│   └── views                  # views 所有页面
│   │  ├── invoice             
│   │  │      └── 发票管理
|   │  └── workhandover
│   │  │      └── 工作交接
│   ├── App.vue                # 入口页面
│   ├── main.js                # 入口文件 加载组件 初始化等
│   └── permission.js          # 权限管理
├── tests                      # 测试
├── .env.xxx                   # 环境变量配置
├── .eslintrc.js               # eslint 配置项
├── .babelrc                   # babel-loader 配置
├── .travis.yml                # 自动化CI配置
├── vue.config.js              # vue-cli 配置
├── postcss.config.js          # postcss 配置
└── package.json               # package.json
</code></pre>
</details>
