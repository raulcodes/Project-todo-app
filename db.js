import Store from 'react-native-store';

const DB = {
  'projects': Store.model('projects')
}

var names = [];
var infos = [];

exports.names = names;
exports.infos = infos;
exports.DB = DB;
