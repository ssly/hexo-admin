# hexo 博客管理系统

> 持续更新中……

本项目实现了在线发布 [hexo](https://hexo.io/zh-tw/index.html) 博客文档，很大程度方便了文档发布！

## 正常使用

### 下载
```bash
git clone https://github.com/ssly/hexo-admin.git hexo-admin
```

### 安装
```bash
cd hexo-admin
npm install --production
```

### 启动
```bash
npm run start # 内部使用 pm2 作为守护进程启动
```

### 访问

http://localhost:3000

> 1. 注意：本项目默认监听3000端口，可在配置文件( config/app.yml )修改
> 2. 必须和 hexo项目 在同一个服务器

#### 反向代理访问

如果你不是直接访问该服务器 3000 端口，而是配置了 nginx 反向代理访问它，可以参考如下步骤：

1. 假设 nginx 配置如下
    ```
    location /admin/ {
      proxy_pass http://localhost:3000/;
    }
    ```
2. 您需要在项目内改两个文件
    ```javascript
    // config/index.js T62
    assetsPublicPath: '/', // --> assetsPublicPath: '/admin',

    // src/assets/ajax.js T10
    const HOST = '/api' // --> const HOST = '/admin/api'
    ```
3. 重新编译 dist 静态资源
    1. 编译之前你需要执行 `npm install` 下载所有的包
    2. 执行编译命令 `npm run build`

4. 然后可以通过 `protocol//ip:port/admin` 访问您的网页
    - 例如你的服务器域名为 `https://a.com` ， 您可以输入 `https://a.com/admin` 访问该页面

### 指令

```bash
npm run start # pm2 启动程序
npm run restart # pm2 重启程序（必须项目已经启动前提下使用）
npm run stop # pm2 停止程序
```

## 项目调试（您可能无需调试）

- 安装时，您需要下载所有依赖包
    - `npm install`
- 启动时，您需要同时启动前端与后台
    - `npm run serve`
    - `npm run start`

## 项目介绍

### 目录结构

```
├── config
│   └── app.yml     // 配置文件
├── dist            // 静态资源
│   ├── index.html
│   └── static
├── src             // 静态资源源码
├── server          // hexo-admin 服务端代码
│   ├── index.js
│   └── yaml.js
└── src
```

### 关于项目

1. 静态资源文件默认已经打包在`dist`目录下，如无需调整，无需关注
2. 配置文件已实现动态配置，可在website配置，亦可直接修改`config/app.yml`

## 联系

邮箱：34771695@qq.com
