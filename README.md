# electron-shadcn-vue

This is not a production ready template. It's just a project to record my progress step by step. Hope it can help you.

## Technology Stack

- [Electron-forge](https://www.electronforge.io/)
- [Vite](https://vitejs.dev/)
- [Electron](https://www.electronjs.org/)
- [shandcn-vue](https://www.shadcn-vue.com/)

## Steps

1. create electron-forge project
```bash
pnpm dlx create-electron-app . --template=vite-typescript
```

2. fix some error for Typescript
```bash
pnpm add -D @electron-forge/shared-types @types/electron-squirrel-startup
```

3. support prettier
- install & create .prettierrc and .prettierignore
```bash
pnpm add -D -E prettier
node --eval "fs.writeFileSync('.prettierrc','{}\n')"
node --eval "fs.writeFileSync('.prettierignore','# Ignore artifacts:\nbuild\ncoverage\n')"
```
- update .prettierrc content as following
```.prettierrc
{
  "$schema": "https://json.schemastore.org/prettierrc",
  "singleQuote": true,
  "semi": false,
  "printWidth": 100
}
```
- add format script to package.json
```json
"scripts": {
    "format": "prettier --write ."
}
```
- format code
```bash
pnpm format
```

4. support vue
- install packages
```bash
pnpm add -D @vitejs/plugin-vue vue-tsc
pnpm add vue @vue/runtime-dom
```
- update typescript
```bash
pnpm up --latest typescript
```
- update vite.renderer.config.ts to complie vue
```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const resolvePath = (alias: string) => path.resolve(__dirname, alias)

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolvePath('./src'),
    },
  },
})
```
- create a vue app in `src/App.vue`
```vue
<script setup lang="ts">
 const name = 'Leopen'
</script>
<template>
  <h1>💖 Hello World, {{name}}!</h1>
  <p>Welcome to your Electron application.</p>
</template>
```
- add body id in index.html
```html
<body id="app">
  <!-- some code will be replaced by vite -->
</body>
```
- init vue app in `src/renderer.ts`
```ts
import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

const app = createApp(App)

app.use(router)
app.mount('#app')
```
- tips: if start electron app failed, you may need config a `.npmrc` file. remember to remove add reinstall dependencies.
```txt
auto-install-peers=true
node-linker=hoisted
```
- 

1. support tailwindcss

2. support shandcn-vue

3.  support i18n

4.  support unit test

5.  support e2e test

## FAQ

- Can TailwindCSS be upgraded to v4?  
  Not yet. cause of shandcn-vue relies on TailwindCSS v3. If you want to upgrade TailwindCSS, you can try to use another ui library.

- Something related to monorepo  
  1. You need to config your root .npmrc file to enable auto-install-peers and node-linker.
  ```txt
  auto-install-peers=true
  node-linker=hoisted
  ```
  2. You also need to run `pnpm approve-builds` to approve the build.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/leopen-hu/electron-shadcn-vue/blob/main/LICENSE) file for details.
