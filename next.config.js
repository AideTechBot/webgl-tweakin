module.exports = {
  basePath: '/webgl-tweakin',
  routes: [
    {
      "src": "/_next/static/(?:[^/]+/pages|chunks|runtime|css|media)/.+",
      "headers": { "cache-control": "public,max-age=31536000,immutable" },
      "continue": true
    },
    { "handle": "filesystem" },
    {"src": "/(.*)", "dest": "/$1.html"}
  ]
}