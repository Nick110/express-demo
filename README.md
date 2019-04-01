# express-demo
Node.js+MongoDB+Express

#### 项目结构：
<pre> 
├── app.js             // 服务的入口文件（整个项目的运行基础架构，基础的设置）
├── bin
│   └── www            // 启动运行（服务端口设置等）
├── db.js              // 连接MongoDB数据库
├── package.json
├── public             // 存放静态文件
│   └── stylesheets
│       └── style.css
├── routes             // 服务端路由，node接口在这里
│   ├── index.js
│   ├── poet.js
│   └── users.js
└── views              // 页面文件（html）
    └── index.html
</pre>

#### 启动  
1. npm start 或者 node bin/www  启动express
2. 浏览器打开http://localhost:8088/

#### 如果需要使用adminMongo可视化工具管理MongDB数据库  
1. npm install admin-mongo
2. 将node_modules下的文件夹移动到项目根目录下:  mv node_modules/admin-mongo/ ./adminMongo  
3. cd adminMongo --> npm install --> npm start --> 浏览器打开 [http://127.0.0.1:1234 ](http://127.0.0.1:1234 )

![adminMongo](https://raw.githubusercontent.com/mrvautin/mrvautin.github.io/master/images/adminMongo/adminMongo_collectionview.png)