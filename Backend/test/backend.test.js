const chai = require('chai')
const {fetchData} = require("../routes/index");

const expect = chai.expect

describe('Check if data returned equals 10 objects',function () {
 it("should contain 10 results", function(){
     const expected = 10
     fetchData("Beyonce","musicTrack").then (res => {
         expect(res.resultCount).to.equal(expected)
     })
 })   
})