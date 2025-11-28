import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  resolve:{
    alias:{
      "@":path.resolve(__dirname,"./src"),
      "@app":path.resolve(__dirname,"./src/app"),
      "@components":path.resolve(__dirname,"./components"),
      "@config":path.resolve(__dirname,"./config"),
      "@hooks":path.resolve(__dirname,"./hooks"),
      "@pages":path.resolve(__dirname,"./pages"),
      "@stores":path.resolve(__dirname,"./stores"),
      "@testing":path.resolve(__dirname,"./testing"),
    }
  },
  plugins: [react()],
})
