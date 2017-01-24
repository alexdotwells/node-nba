// const nba = require('./lib').default
const defaults = require('./lib/api/stats/constants/defaults')
// const endpoints = require('./lib/api/data/constants/endpoints')

let x = ''

for (let m in defaults) {
  let o = defaults[m]
  let defs = Object.keys(o.defaults).map(d => `\`${d}\``)
  x += `- \`${o.method}\`
  + Endpoint: [\`${o.endpoint}\`](http://stats.nba.com/${o.endpoint})
  + Parameters:
    * ${defs.join('\n    * ')}
  \n`
}

// for (let e in endpoints) {
//   let o = endpoints[e]
//   let re = /{{([^}]+)}}/g
//   let parameters = (o.endpoint.match(re) || []).map(p => `\`${p.split(re)[1]}\``)
//   x += `- \`${o.method}\`
//   + Endpoint: [\`${o.endpoint}\`](http://data.nba.net/${o.endpoint})`

//   if (parameters && parameters.length > 0) {
//     x += `
//   + Parameters:
//     * ${parameters.join('\n    * ')}
//     `
//   } else {
//     x += '\n'
//   }

//   x += '\n'
// }

const fs = require('fs')

fs.writeFile('test.md', x, (err) => {
  if (err) {
    return console.error(err)
  }

  console.log('Done.')
})


// for (var m in DEFAULTS) {
//   var o = DEFAULTS[m];
//   console.log(`- \`${m}\`\n  + Possible values:`)
//   o.forEach(el => {
//     if (el === 'null') {
//       console.log(`    * \`null\``)
//     } else {
//       console.log(`    * \`'${el}'\``)
//     }
//   })
// }
