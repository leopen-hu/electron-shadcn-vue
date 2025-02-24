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
- config tsconfig.json
```json
{
  "compilerOptions": {
    "module": "ESNext",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "outDir": "dist",
    "types": ["vite/client", "electron"],
    "moduleResolution": "bundler",
  },
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.vue", "shims-vue.d.ts"],
  "exclude": ["node_modules", "dist", "out"]
}
```
- add shims-vue.d.ts
```ts
declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent;
  export default component;
}
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
- tips: if start electron app failed, see FAQ below.

5. support tailwindcss
- install packages
```bash
pnpm add -D tailwindcss@3 postcss autoprefixer tailwindcss-animate
```
- add `postcss.config.ts`
```typescript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  }
}
```
- add `tailwind.config.ts`
```typescript
import animate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx,vue}', './index.html'],
  plugins: [animate],
}
```
- update `src/index.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

6. support shandcn-vue
- copy `vite.renderer.config.ts` to `vite.config.ts`. Do this to make shadcn-vue cli knows what you are using is vite.
- run shadcn-vue cli
```bash
pnpm dlx shadcn-vue@latest init
```
- delete `vite.config.ts`
- add button
```bash
pnpm dlx shadcn-vue@latest add button
```
- check shadcn-vue works
- edit `src/App.vue`
```vue
<script setup lang="ts">
import { Button } from '@/components/ui//button'
const name = 'Leopen'
const onButtonClick = () => {
  console.log('Button clicked!')
}
</script>
<template>
  <h1 class="text-red-500">💖 Hello World, {{ name }}!</h1>
  <p>Welcome to your Electron application.</p>
  <Button @click="onButtonClick">Test shadcn-vue</Button>
</template>
```
- run `pnpm start` and you will see the button. it works!

7. Now you can start building your Electron application with shadcn-vue and TailwindCSS. You can also add something more to suit your needs such as vitest for testing, etc.

8. You can see what I'v done in this repo: https://github.com/leopen/digital-nomad/apps/rest-now for more details.

## FAQ

- Can TailwindCSS be upgraded to v4?  
  Not yet (February 2025). cause of shandcn-vue relies on TailwindCSS v3. If you want to upgrade TailwindCSS, you can try to use another ui library.

- Something tips 
  1. You may need to config your root .npmrc file to enable auto-install-peers and node-linker.
  ```txt
  auto-install-peers=true
  node-linker=hoisted
  ```
  2. You also need to run `pnpm approve-builds` to approve the build.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/leopen-hu/electron-shadcn-vue/blob/main/LICENSE) file for details.
