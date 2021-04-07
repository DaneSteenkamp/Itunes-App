var express = require("express");
var router = express.Router();
const fetch = require("node-fetch"); // Must import node fetch to use the fetch method in Backend

/* Using the fetch method in the backend to interface with iTunes */
const fetchData = async(query,entity) => {
 const apiCall = await  fetch(
    `https://itunes.apple.com/search?term=${query}&entity=${entity}&limit=10`
  )
  const res = await apiCall.json()
  return res
}

/* GET home page. */
router.get("/search/:query/:entity", function (req, res) {
  const query = req.params.query;
  const entity = req.params.entity;

  
  fetchData(query,entity)
    .then((data) => res.send(data.results))
    .catch((err) => console.log(err));
});

module.exports = {router,fetchData}
