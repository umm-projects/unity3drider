var mkdirp = require('mkdirp');
var path = require('path');
var package = require('../package.json');
var ncp = require('ncp').ncp;

var script_directory = __dirname;
// パッケージ名が @ で始まるならスコープ有りと見なす
var has_scope = /^@/.test(package.name);

if ('node_modules' != path.basename(path.resolve(script_directory, (has_scope ? '../' : '') + '../../'))) {
  // 開発インストールの場合無視する
  return;
}

// スクリプトの存在するディレクトリから見たパス
var source = path.resolve(script_directory, '../Assets/Plugins/Editor/JetBrains');
// Rider のプラグインは Assets/Plugins/Editor/JetBrains/ 以下に配置する
var destination = path.resolve(script_directory, (has_scope ? '../' : '') + '../../../Assets/Plugins/Editor/JetBrains');

// 宛先ディレクトリを作る (mkdir -p)
mkdirp(destination, function(err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  ncp(
    source,
    destination,
    function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    }
  );
});
