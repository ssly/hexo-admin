# hexo 博客管理系统

> 持续更新中……

本项目实现了在线发布 [hexo](https://hexo.io/zh-tw/index.html) 博客文档，很大程度方便了文档发布！

## 项目启动

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
# 守护进程启动，建议借助 pm2
npm install -g pm2

pm2 start server/index.js
```

### 访问

http://localhost:3000

> 1. 注意：本项目默认监听3000端口，可在配置文件( config/app.yml )修改
> 2. 必须和 hexo项目 在同一个服务器

### 调试（您可能无需调试）

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
