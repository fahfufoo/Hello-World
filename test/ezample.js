var cal = require('../calGrade.js');
var test = require('unit.js');

describe('Test function calculate Grade', function(){

  it('value return A', function(){

    var score = [80,95,100];

    for(var i in score)   
    test.assert(cal.calGrade(score[i]) == 'A');
 

  });

  it('value return B', function(){
    var score = [70,74.5,79];

    for(var i in score)
    test.assert(cal.calGrade(score[i]) == 'B');

  });

  it('value return C', function(){

    var score = [60,60.1,67,69];

    for(var i in score)
    test.assert(cal.calGrade(score[i]) == 'C');

  });

  it('value return D', function(){

    var score = [50,52,59,59.9];

    for(var i in score)
    test.assert(cal.calGrade(score[i]) == 'D');

  });

 it('value return F', function(){

    var score = [0,25,7,32,49.999999999];

    for(var i in score)
    test.assert(cal.calGrade(score[i]) == 'F');

  });

 it('value outofscope', function(){

    var score = [-1,-0.0000006,101,100.01,5200,-9700,752,'21','test',{ },0/0];
 
    for(var i in score)
    test.assert(cal.calGrade(score[i]) === undefined);

  });
});


