var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');
var rimraf = require('rimraf');
var package = require('../package.json');

var script_directory = __dirname;
// パッケージ名が @ で始まる場合はスコープ有りと見なす
var has_scope = /^@/.test(package.name);

if ('node_modules' != path.basename(path.resolve(script_directory, (has_scope ? '../' : '') + '../../'))) {
  // 開発インストールの場合無視する
  return;
}

// スクリプトの存在するディレクトリから見たパス
//   無関係なディレクトリを消さないように、ちょっと潜ったパスを削除する
var destination = path.resolve(script_directory, (has_scope ? '../' : '') + '../../../Assets/Plugins/Editor/JetBrains');

// 配置先ディレクトリを全削除
fs.access(
  destination,
  function(err) {
    if (err && err.code == 'ENOENT') {
      return;
    }
    rimraf(
      destination,
      function(_) {
        // Do nothing.
      }
    );
  }
);
