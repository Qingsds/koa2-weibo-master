# koa2-weibo-master

## 页面和路由

- 注册 /register
- 登录 /login
- 首页 /
- 个人主页 /profile/:userName
- at 页 /atMe
- 广场 /square
- 设置 /setting
- 错误页 /error
- 404 /*

## API

- 首页
  - 创建微博 /api/blog/crate
  - 上传图片 /api/utils/upload
  - 加载更多 /api/blog/loadMore/:pageIndex
- 个人主页
  - 加载更多 /api/profile/loadMore/:userName/:pageIndex
  - 关注 /api/profile/follow
  - 取消关注 /api/profile/unFollow
- 广场页 
  - 加载更多 /api/square/loadMore/:pageIndex

