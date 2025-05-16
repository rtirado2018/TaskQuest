const { execSync } = require('child_process');
module.exports = async function (context) {
  process.env.PATH += ':/usr/local/bin';
  execSync('which appimagetool');
};
