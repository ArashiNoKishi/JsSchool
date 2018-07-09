# Challenge 7 User guide

To run this challenge is needed all node dependencies with `node install`

To fill up the database run `node server/data/populatedb.js`

First is needed to run both server/server.js and webpack with `concurrently "node server/server.js" webpack`
server.js run on port 3001 by default, and ReactApp on port 8080, if server.js is required to run on a different port change the port on the package.json file in the "proxy" key, and on webpack.config.js on "devServer" key

Missing from this challenge:
*  jwt

# Challenge 8 update

Fixed cors links on setup populatedb.js and added users to the populate process.

* Added login page, with 2 users/password pairs that are: jacobtrlm/user123 and jobsity/jobsity123
* Implemented axios library to fetch data from the api
* Implemented React intermediate concepts
* Refactored code according to feedback

Missing from this Challenge:
* Lending endpoint is not secured.
