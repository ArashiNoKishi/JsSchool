# Challenge 7 User guide

To run this challenge is needed all node dependencies with `node install`

To fill up the database run `node server/data/populatedb.js`

First is needed to run both server/server.js and an http-server with 
`concurrently "node server/server.js" "http-server -P http://localhost:3001"`
server.js run on port 3001 by default, and ReactApp on port 8080, if server.js is required to run on a different port change the port on the package.json file in the "proxy" key, and on http-server -P flag

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


# Challenge 9 update

Fixed setup process to make it easier

* Added Styled components to make the css rules for the components
* Implemented Redux to manage global states of the app
* Added missing "Personal Loans" feature
* Simplifyed Lending process and also secured its endpoint
* Added css rules to make app responsive 
* Spread components into their own file directories