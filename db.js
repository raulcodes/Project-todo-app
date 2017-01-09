import Store from 'react-native-store';

const DB = {
  'projects': Store.model('projects')
}

var names = [];
var infos = [];
var i = 0;

exports.names = names;
exports.infos = infos;
exports.i = i;
exports.DB = DB;
