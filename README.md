## 前后端一体化开发
前端nestjs+后端nuxtjs+trpc  
前端端口3000，后端端口4000  
数据库为本地MongoDB  
最后更新时间2025.1.18

### 工作流程
1. 克隆仓库
2. 根目录 `pnpm i`
3. 开发
   1. 前端 `packages/frontend` 正常使用Nuxt， `utils/` 中分别为：
      1. `class.ts` ：导出后端的数据类型
      2. `client.ts` ：封装trpc为前端直接使用的函数
      3. `trpc.ts` ：trpc连接配置
   2. 后端 `packages/backend` 正常使用Nest， `src/trpc` 中：
      1. `mongodb/` ：定义数据类型、建立Repository
      2. `trpc.module.ts` ：nestjs的模块文件，Repository等需要注入的类型在此声明
      3. `trpc.router.ts` ：trpc具体函数实现，调用Repository
      4. `trpc.service.ts` ：trpc参数设置， `t.procedure.use` 进行筛选

### 运行

##### 测试运行
```
pnpm dev
```

##### 部署运行
```
pnpm build
pnpm start
```

### 可优化
1. 数据需要定义三次（class，zod，mongodb schema），冗余

### 帮助理解
rpc流程：
1. 前端调用（vue代码中调用client.ts中的函数）
2. trpc/client调用（client.ts调用trpc函数）
3. trpc/server调用（trpc调用后端trpc.router.ts中的函数）
4. 后端Repository调用（trpc.router.ts中调用Repository中的函数）
5. 数据库调用（Repository调用mongoose）

### 从零开始的手动建立流程
1. 根目录编写 `pnpm-workspace.yaml`
2. 前端
   1. pnpm安装nest `pnpm i -g @nestjs/cli`
   2. 根目录新建nest项目 `nest new packages/backend`
   3. 进入该目录 `cd packages/backend` ，安装trpc/server `pnpm i @trpc/server`
   4. vscode的eslint会报错，在.eslintrc.js中加入 `, EndOfLineState: "auto"`
   5. 编写 `src/trpc` 的trpc nest模块，并在 `app.module.ts` 中 imports
   6. 在 `main.ts` 中连接MongoDB，加载trpc中间件，修改端口号
3. 后端
   1. 根目录新建nuxt ui项目 `pnpx nuxi init -t ui packages/frontend`
   2. 进入该目录 `cd packages/frontend` ，安装trpc/client `pnpm i @trpc/client`
   3. 编写 `utils/` 下的ts代码
   4. 正常使用nuxt（如 新建 `pages/index.vue` 并在 `app.vue` 加入 `<NuxtLayout><NuxtPage/></NuxtLayout>` ）
   5. （可选）引入nuxt image以使用 `<NuxtImg>` 等组件 `pnpx nuxi@latest module add image` 。若有bug是低版本sharp库在windows中引起的，解决：根目录 `package.json` 加入 `"pnpm": { "overrides": { "sharp": "0.33.5" } }`
4. 根目录 `pnpm i`
5. 完成