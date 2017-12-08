module.exports = {
  apps: [{
    name: 'hour-logger-server',
    script: 'dist/index.js',
    env: {
      'NODE_ENV': 'production'
    }
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'branlee.me',
      key: '~/.ssh/hour_logger.pem',
      ref: 'origin/master',
      repo: 'git@github.com:brandonlee781/hour_logging_graphql.git',
      path: '/home/ubuntu/server',
      'post-deploy': 'npm install && npm run build && pm2 startOrRestart ecosystem.config.js'
    }
  }
}
