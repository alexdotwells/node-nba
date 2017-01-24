const nba = require('nba.js').default;
const util = require('util')

var teams;

nba.data.teams({
  year: 2016
}).then(function(res) {
  teams = res;
  console.log(util.inspect(teams, false, null));
}).catch(function(err) {
  console.error(err);
});


 console.log('end');
