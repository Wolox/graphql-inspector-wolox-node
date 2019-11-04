const minimist = require('minimist');

const args = minimist(process.argv.slice(2), {
  alias: {
    o: 'old-schema',
    n: 'new-schema'
  }
});

module.exports = { args };
