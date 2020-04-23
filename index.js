var request = require('xhr-request');
const prompt = require('prompt');
var clear = require('clear');
clear();
x = 0
// get from
// https://kahoot.it/challenge/2ed959ef-c044-4bc2-86cc-45b6da85caf9_1587146961869

// to
// https://kahoot.it/rest/challenges/2ed959ef-c044-4bc2-86cc-45b6da85caf9_1587146961869?includeKahoot=true

String.prototype.allReplace = function(obj) {
  var retStr = this;
  for (var x in obj) {
      retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
  }
  return retStr;
};

String.prototype.splice = function(idx, rem, str) {
  return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};




prompt.start();

prompt.get(['url'], function (err, result) {
  if (err) { return onErr(err); }
  console.log('Your URL:' + result.url);
  url = result.url.replace("https://kahoot.it/challenge/", "https://kahoot.it/rest/challenges/");
  url = url.concat("?includeKahoot=true");
  console.log(url);
  //var spliced = result.url.splice(4, 0, "");
  request(url, {
    json: true
  }, function (err, data) {
    if (err) throw err
    num = 0
    // the JSON result
    clear();
    qNum = data.kahoot.questions.length
    console.log('This kahoot has ' + qNum + ' questions.\n===========================');
    
  for(i = 0; i < qNum; i++) {
      questions = data.kahoot.questions[i].choices
  for (var key in data.kahoot.questions) {
      x = x + 1;
      if (!questions.hasOwnProperty(key)) continue;
      var obj = questions[key];
      for (var prop in obj) {
          
          if (!obj.hasOwnProperty(prop)) continue;
              if (obj[prop].toString().includes('true')){
                  //obj.answer.replace('<sup>','^');
                  str = obj.answer.toString()
                  console.log((i + 1) + ". Answer: " + obj.answer.allReplace({'<sup>': '^', '</sup>': ''}) + '\n');
              }
              
      }   
  
  }
}
  });
});

function onErr(err) {
  console.log(err);
  return 1;
}

