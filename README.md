# nest-next-module

## 简介

在[nestjs](https://nestjs.com)中使用[nextjs](https://nextjs.org)做模板渲染引擎.

由于需求要做SEO, 自然而然的想到了SSR. 在对比`Angular Universal`, `nuxtjs`, `nextjs`之后, 选择了`nextjs`.

同时发现, `nextjs`如果要增加动态路由等功能, 需要后台去做支持, 于是选择了`typescript`支持最完善的`nestjs`框架.

于是如何将`nestjs`与`nextjs`一起使用, 就成了我们主要解决的问题.

在`nestjs`和`nextjs`中都包含一个`node http`的实现, 因此需要将`nestjs`的页面路由请求, 转发给`nextjs`去处理渲染模板, 以及一些静态资源的访问也需要做转发.

在`nestjs`的[issues 1122](https://github.com/nestjs/nest/issues/1122)中[Kyle McCarthy](https://github.com/kyle-mccarthy)写了一个[nest-next](https://github.com/kyle-mccarthy/nest-next)包, 仔细阅读了其源码之后, 我决定自己写一个绑定模块.

原因主要是因为`nest-next`篡改了`nestjs`中`express`中的模板引擎, 侵入性比较强, 如果我还需要用`express`的模板渲染的话, 是不可能做到的. 其次`nest-next`的模块导入方式不符合`nestjs`模块正常使用方式, 需要手动启动`next-server`并绑定.

## Demo

[nest-next-module-demo](https://github.com/ananiy/nest-next-module-demo/tree/release/v0.1.8)

[nest-next-module-demo-with-typescript](https://github.com/ananiy/nest-next-module-demo/tree/using-typescript)

## 开始使用


- 安装`@nestjs/cli`, 新建一个项目:

```bash
$ npm i -g @nestjs/cli
$ nest new nest-next-demo # 请选择使用yarn安装模块
```

- 安装`NestNextModule`包, 和`nextjs`相关依赖:

```bash
$ yarn add nest-next-module next react react-dom
```

- 在`AppModule`中导入`NestNextModule`:

```ts
// src/app.module.ts

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NestNextModule } from 'nest-next-module';

const dev = process.env.NODE_ENV !== 'production';

@Module({
  imports: [NestNextModule.forRoot({ dev })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

- 在`AppController`中创建路由, 使用`nextjs`的`render`渲染模板:

```ts
// src/app.controller.ts

import { Controller, Get, Res } from '@nestjs/common';
import { NextResponse } from 'nest-next-module';

@Controller()
export class AppController {
  @Get()
  index(@Res() res: NextResponse) {
    return res.nextRender('/index');
  }
}
```

- 根目录新建`pages`文件夹, 新建`index.jsx`文件:

```jsx
// pages/index.tsx

import React from 'react';

const Page = () => {
  return <h1>hello nest next!</h1>;
};

export default Page;
```

- 启动项目:

```bash
$ yarn start
```

- 打开浏览器, 访问`http://localhost:3000/`.

## 在nextjs中使用typescript

- 为了在`nextjs`中使用`typescript`, 需要安装`@zeit/next-typescript`包, 和一些的声明文件包:

```bash
$ yarn add @zeit/next-typescript
$ yarn add @types/next @types/react @types/react-dom -D
```

- 项目根目录新建`.babelrc.js`和`next.config.js`:

```js
// .babelrc.js
module.exports = {
  presets: ['next/babel', '@zeit/next-typescript/babel'],
};

// next.config.js
const withTypescript = require('@zeit/next-typescript');

module.exports = withTypescript({
  useFileSystemPublicRoutes: false,
});
```

- 更新下`tsconfig.json`, 增加了`jsx`, `moduleResolution`, `esModuleInterop`的编译选项配置:

```json
{
  "compilerOptions": {
    "jsx": "preserve",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "target": "es6",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true
  },
  "exclude": ["node_modules"]
}
```

- 重命名`pages/index.jsx`为`pages/index.tsx`, 加入类型:

```tsx
import React from 'react';
import { NextFC } from 'next';

const Page: NextFC = () => {
  return <h1>hello nest next!</h1>;
};

export default Page;
```

- 启动项目:

```bash
$ yarn start
```

- 打开浏览器, 访问`http://localhost:3000/`.
