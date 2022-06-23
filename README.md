# cndrs-front

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

这里是核算预约检测系统的前端仓库，项目使用[Create React App](https://github.com/facebook/create-react-app)脚手架创建。

## 技术栈

- 主框架/技术：React、TypeScript
- 辅助：React-Hooks、React Router、Redux、Axios、Styled-Components
- 组件库：Ant Design Mobile

## 目录结构

    ├───public          静态资源目录
    ├───src             源码目录   
        ├───global.css  全局CSS样式
        ├───index.tsx   
        │
        ├───@types      全局type
        ├───components  通用组件
        ├───hooks       自定义Hooks
        ├───pages       独立页面
        │   ├───App
        │   ├───Login
        │   ├───ProjectEditor
        │   ├───ProjectList
        │   └───UserHome
        ├───redux       redux逻辑
        ├───route       路由
        ├───service     网络接口
        └───util        实用工具
    
## 统一代码风格

1. 命名规范：
  - 组件和路由页统一使用大驼峰命名，例如：components/NotFound.tsx 和 pages/Login/...
  - 如果组件或路由页需要嵌套，则最外层使用大驼峰，例如：
  
        ├───pages       独立页面
        │   ├───Login
        │       ├───components
        │       │   └───.....
        │       └───index.tsx
        
  - 缩略词全大写，当位于开头且不需要导出时，使用全小写
2. 接口调用：二次封装axios
3. 通用的ts类型文件统一写在@types下
4. 服务器执行请求失败的Error统一使用自定义的ExecuteError

## 代码提交规范

`<type>(<scope>): <subject>`
- type 为必填项，用于指定 commit 的类型。
- `build`：更改构建系统和外部依赖项（如将 gulp 改为 webpack ，更新某个npm包）
- `ci`：对CI配置文件和脚本的更改
- `docs`：仅仅修改文档说明
- `feat`：增加一个新特性
- `fix`：修复一个bug
- `perf`：更改代码以提高性能
- `refactor`：代码重构时使用
- `style`：不影响代码含义的改动，例如去掉空格、改变缩进、增删分号
- `test`：增加新的测试功能或更改原有的测试模块
- `chore`：杂项
- `revert`：回滚代码时使用

## npm脚本

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## 相关链接

- React官方文档：https://react.docschina.org/
- React(hooks)：https://react.docschina.org/docs/hooks-intro.html | https://beta.reactjs.org/
- react-router：https://reactrouter.com/docs/en/v6/getting-started/tutorial
- typescript：[TypeScript入门](https://ex4tjk8ii1.feishu.cn/docs/doccnE8fHbzDEgJNptmhz0suFZe)
- create-react-app：https://create-react-app.dev/docs/getting-started
- Style-components：https://styled-components.com/docs/basics#getting-started
- axois：https://axios-http.com/zh/docs/example
- Ant Design Mobile：https://mobile.ant.design/