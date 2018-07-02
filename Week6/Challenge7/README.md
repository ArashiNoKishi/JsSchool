# Challenge 7 User guide

To run this challenge is needed all node dependencies with `node install`

To fill up the database run `node server/data/populatedb.js`

First is needed to run both server/server.js and webpack with `concurrently "node server/server.js" webpack`
server.js run on port 3001 by default, and ReactApp on port 8080, if server.js is required to run on a different port change the port on the package.json file in the "proxy" key, and on webpack.config.js on "devServer" key

Missing from this challenge:
*  jwt 
