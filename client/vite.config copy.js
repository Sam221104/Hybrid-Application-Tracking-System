export default {
  server: {
    proxy: {
      '/api': {
        target: 'https://hybrid-application-tracking-system-6s0h.onrender.com',
        changeOrigin: true,
        secure: false
      }
    }
  }
}
