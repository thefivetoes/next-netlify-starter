module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      if (isServer) {
          const glob = require("glob");
          const allArticles = glob.sync("./_articles/*.json");
          const fs = require("fs");
          const articleContent = allArticles.map(article => {
              var content = fs.readFileSync(article, "utf8");
              return JSON.parse(content);
          });
          global.allArticles = articleContent;
          // Get a list of all Articles
      }
    // Important: return the modified config
    return config;
  },
};
