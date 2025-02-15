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
3. add prettier and config file
```bash
pnpm add -D -E prettier
node --eval "fs.writeFileSync('.prettierrc','{}\n')"
node --eval "fs.writeFileSync('.prettierignore','# Ignore artifacts:\nbuild\ncoverage\n')"
```
4. update .prettierrc content as following
```.prettierrc
{
  "$schema": "https://json.schemastore.org/prettierrc",
  "singleQuote": true,
  "semi": false,
  "printWidth": 100
}
```

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/leopen-hu/electron-shadcn-vue/blob/main/LICENSE) file for details.
