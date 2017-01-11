import Store from 'react-native-store';

const DB = {
  'projects': Store.model('projects')
}

var projects = [];
var names = [];
var infos = [];
var dates = [];
var i = 0;

exports.projects = projects;
exports.names = names;
exports.infos = infos;
exports.dates = dates;
exports.i = i;
exports.daysSince = function(i) {
  var minutes = 1000 * 60;
  var hours = minutes * 60;
  var days = hours * 24;
  var d = new Date();
  var t = d.getTime();
  var l = t - i;
  console.log(Math.floor(l/days));
  return Math.floor( l / days );
};
exports.project = function(name, info, date) {
  this.name = name;
  this.info = info;
  this.date = date;
};
exports.DB = DB;
