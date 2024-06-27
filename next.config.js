module.exports = {
    async rewrites() {
      return [
        {
          source: '/api/flask/:path*',
          destination: 'http://127.0.0.1:5328/:path*', 
        },
      ]
    },
  }