# electron-shadcn-vue

This is not a production ready template. It's just a project to record my progress step by step. Hope it can help you.

## Technology Stack

- [Electron-forge](https://www.electronforge.io/)
- [Vite](https://vitejs.dev/)
- [Electron](https://www.electronjs.org/)
- [shandcn-vue](https://www.shadcn-vue.com/)

## Steps

```bash
# create electron-forge project
pnpm dlx create-electron-app . --template=vite-typescript

# fix some error for Typescript
pnpm add -D @electron-forge/shared-types @types/electron-squirrel-startup
```

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/leopen-hu/electron-shadcn-vue/blob/main/LICENSE) file for details.
