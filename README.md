# nest-next-module

## Getting Started

```bash
$ npm i nest-next-module
# or
$ yarn add nest-nest-module
```

```js
// .babelrc.js

module.exports = {
  presets: ['next/babel', '@zeit/next-typescript/babel'],
}
```

```js
// next.config.js

const withTypescript = require('@zeinext-typescript')

module.exports = withTypescript({
  useFileSystemPublicRoutes: false,
})
```

update `tsconfig.json`:

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "esnext",
    "jsx": "preserve",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "strict": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "sourceMap": true,
    "incremental": true,
    "baseUrl": "."
  }
}
```

```ts
// src/app.module.ts

import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { NestNextModule } from 'nest-next-module'

const dev = process.env.NODE_ENV !== 'production'

@Module({
  imports: [NestNextModule.forRoot({ dev })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

```ts
// src/app.controller.ts

import { Controller, Get, Res } from '@nestjs/common'
import { NextResponse } from 'nest-next-module'

@Controller()
export class AppController {
  @Get()
  index(@Res() res: NextResponse) {
    return res.nextRender('/index')
  }

  @Get('about')
  about(@Res() res: NextResponse) {
    return res.nextRender('/about')
  }
}
```

```tsx
// pages/index.tsx

import React from 'react'

const Page = () => {
  return <h1>hello nest next!</h1>
}

export default Page
```
