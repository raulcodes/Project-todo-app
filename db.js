import Store from 'react-native-store';

const DB = {
  'projects': Store.model('projects')
}

var project = {
  name: '',
  info: '',
  date: 0,
};

var projects = [];
var names = [];
var infos = [];
var dates = [];
var i = 0;

exports.project = project;
exports.projects = projects;
exports.names = names;
exports.infos = infos;
exports.dates = dates;
exports.i = i;
exports.DB = DB;
