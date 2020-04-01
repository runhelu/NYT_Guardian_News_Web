var express = require('express');
const cors = require('cors');
var app = express();
app.use(cors(
  {
    origin: ['http://localhost:3000'],
  }
)); 

app.get('/test', function (req, res) {
  res.json('Hello World');
});

app.get('/api/homeNY', function(req, res){
  let request = require('request');
  request({
    url: 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=IJxm1EGJgByhWknWQ4uERJK82eMYjTtU',
    headers: {
      "content-type": "application/json",
    },
    json: true,
  }, function(error, response, body){
    if(!error && response.statusCode == 200){
      res.json(body);
    }
  })
});

app.get('/api/NYWorld', function(req, res){
  let request = require('request');
  request({
    url: 'https://api.nytimes.com/svc/topstories/v2/world.json?api-key=IJxm1EGJgByhWknWQ4uERJK82eMYjTtU',
    headers: {
      "content-type": "application/json",
    },
    json: true,
  }, function(error, response, body){
    if(!error && response.statusCode == 200){
      res.json(body);
    }
  })
});

app.get('/api/NYPolitics', function(req, res){
  let request = require('request');
  request({
    url: 'https://api.nytimes.com/svc/topstories/v2/politics.json?api-key=IJxm1EGJgByhWknWQ4uERJK82eMYjTtU',
    headers: {
      "content-type": "application/json",
    },
    json: true,
  }, function(error, response, body){
    if(!error && response.statusCode == 200){
      res.json(body);
    }
  })
});

app.get('/api/NYBusiness', function(req, res){
  let request = require('request');
  request({
    url: 'https://api.nytimes.com/svc/topstories/v2/business.json?api-key=IJxm1EGJgByhWknWQ4uERJK82eMYjTtU',
    headers: {
      "content-type": "application/json",
    },
    json: true,
  }, function(error, response, body){
    if(!error && response.statusCode == 200){
      res.json(body);
    }
  })
});

app.get('/api/NYTechnology', function(req, res){
  let request = require('request');
  request({
    url: 'https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=IJxm1EGJgByhWknWQ4uERJK82eMYjTtU',
    headers: {
      "content-type": "application/json",
    },
    json: true,
  }, function(error, response, body){
    if(!error && response.statusCode == 200){
      res.json(body);
    }
  })
});

app.get('/api/NYSports', function(req, res){
  let request = require('request');
  request({
    url: 'https://api.nytimes.com/svc/topstories/v2/sports.json?api-key=IJxm1EGJgByhWknWQ4uERJK82eMYjTtU',
    headers: {
      "content-type": "application/json",
    },
    json: true,
  }, function(error, response, body){
    if(!error && response.statusCode == 200){
      res.json(body);
    }
  })
});


app.get('/api/homeGuardian', function(req, res){
  let request = require('request');
  request({
    url: 'https://content.guardianapis.com/search?api-key=39659f23-1ee4-4ea2-a770-8c05f5f5b493&section=(sport|business|technology|politics)&show-blocks=all',
    headers: {
      "content-type": "application/json",
    },
    json: true,
  }, function(error, response, body){
    if(!error && response.statusCode == 200){
      res.json(body);
    }
  })
});

app.get('/api/GuardianWorld', function(req, res){
  let request = require('request');
  request({
    url: 'https://content.guardianapis.com/world?api-key=39659f23-1ee4-4ea2-a770-8c05f5f5b493&show-blocks=all',
    headers: {
      "content-type": "application/json",
    },
    json: true,
  }, function(error, response, body){
    if(!error && response.statusCode == 200){
      res.json(body);
    }
  })
});

app.get('/api/GuardianPolitics', function(req, res){
  let request = require('request');
  request({
    url: 'https://content.guardianapis.com/politics?api-key=39659f23-1ee4-4ea2-a770-8c05f5f5b493&show-blocks=all',
    headers: {
      "content-type": "application/json",
    },
    json: true,
  }, function(error, response, body){
    if(!error && response.statusCode == 200){
      res.json(body);
    }
  })
});

app.get('/api/GuardianBusiness', function(req, res){
  let request = require('request');
  request({
    url: 'https://content.guardianapis.com/business?api-key=39659f23-1ee4-4ea2-a770-8c05f5f5b493&show-blocks=all',
    headers: {
      "content-type": "application/json",
    },
    json: true,
  }, function(error, response, body){
    if(!error && response.statusCode == 200){
      res.json(body);
    }
  })
});

app.get('/api/GuardianTechnology', function(req, res){
  let request = require('request');
  request({
    url: 'https://content.guardianapis.com/technology?api-key=39659f23-1ee4-4ea2-a770-8c05f5f5b493&show-blocks=all',
    headers: {
      "content-type": "application/json",
    },
    json: true,
  }, function(error, response, body){
    if(!error && response.statusCode == 200){
      res.json(body);
    }
  })
});

app.get('/api/GuardianSports', function(req, res){
  let request = require('request');
  request({
    url: 'https://content.guardianapis.com/sport?api-key=39659f23-1ee4-4ea2-a770-8c05f5f5b493&show-blocks=all',
    headers: {
      "content-type": "application/json",
    },
    json: true,
  }, function(error, response, body){
    if(!error && response.statusCode == 200){
      res.json(body);
    }
  })
});

app.get('/api/search', function(req, res){
  let query = req.query.keyword;
  let news = req.query.news;
  let request = require('request');
  if(news === 'NYTimes'){
    request({
      url: 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + query + '&api-key=IJxm1EGJgByhWknWQ4uERJK82eMYjTtU',
      headers: {
        "content-type": "application/json",
      },
      json: true,
    }, function(error, response, body){
      if(!error && response.statusCode == 200){
        res.json(body);
      }
    })
  }
  else{
    request({
      url: 'https://content.guardianapis.com/search?q=' + query + '&api-key=39659f23-1ee4-4ea2-a770-8c05f5f5b493&show-blocks=all',
      headers: {
        "content-type": "application/json",
      },
      json: true,
    }, function(error, response, body){
      if(!error && response.statusCode == 200){
        res.json(body);
      }
    })
  }
});


app.get('/api/detail', function(req, res){
  let id = req.query.id;
  let news = req.query.news;
  let request = require('request');
  if(news == 'NYTimes'){
    request({
      url: "https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:%22" + id + "%22&api-key=IJxm1EGJgByhWknWQ4uERJK82eMYjTtU",
      headers:{
        "content-type": "application/json",
      },
      json: true,
    }, function(error, response, body){
      if(!error && response.statusCode == 200){
        res.json(body);
      }
    })
  }
  else{
    request({
      url: "https://content.guardianapis.com/" + id + "?api-key=39659f23-1ee4-4ea2-a770-8c05f5f5b493&show-blocks=all",
      headers:{
        "content-type": "application/json",
      },
      json: true,
    }, function(error, response, body){
      if(!error && response.statusCode == 200){
        res.json(body);
      }
    })
  }
});

var server = app.listen(8080, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("http://%s:%s", host, port)
 
})