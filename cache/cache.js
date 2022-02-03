const NodeCache = require( "node-cache" );
const myCache = new NodeCache();

const cache = { myCache: myCache }
module.exports = { cache }