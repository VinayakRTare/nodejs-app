/*
MongoDB 2.4 database added.  Please make note of these credentials:

   Root User:     admin
   Root Password: gRvhq_LLpEWI
   Database Name: nodejs

Connection URL: mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/
*/
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');

var google = require('googleapis');

var mongoose = require('mongoose');
var fs = require('fs');
//var http = require('http');
 var googleTrends = require('google-trends-api');

/* googleTrends.trendData('')//["finance planning","financial goals","revolving loans","open ended loans","close ended loans","debit collection","chapter 11 bankrupcy","housing","renting","home buying","property insurance","home selling","mortgages","liability insurance","home owners insurance","renters insurance","private insurance company","medical service plans","health maintenance organizations","property providers","bpo's","home healthcare","health plans","medicare","medicaid"])
.then(function(results){
	console.log(results);
})
.catch(function(err){
	console.error(err);
});  */



app.use(bodyParser.json()); //for parsing app 
app.use(bodyParser.urlencoded({extended:true})); // for parsing th eapp
app.use(multer()); //for parsing multipart

app.use(express.static(__dirname + '/public'));
var connectionString = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/test';
mongoose.connect(connectionString); //connects to local DB


/*** Construct Schema for website - Start ***/
var WebsiteSchema = new mongoose.Schema({
	article : String
},{collection : 'web'}); //override default collection name as web


/*** creating modal to instantiate website - Start *****/
var WebsiteModel = mongoose.model('WebsiteModel',WebsiteSchema);


/*** Construct Schema for website - End ***/


/*** Construct Schema for search results of 9 articles - Start ***/
var ArticleSchema = new mongoose.Schema({
	title : String,
	iframeLink : String,
	snippet : String,
	imgUrl : String
	
},{collection : 'articleRes'}); //override default collection name as web
var ArticleResult = mongoose.model('ArticleResult',ArticleSchema);

/*** Construct Schema for search results of 9 articles - Start ***/
var ArticleSchemaFake = new mongoose.Schema({
	title : String,
	iframeLink : String,
	date:String,
	snippet : String,
	imgUrl : String,
	displayLink:String,
	rank : String,
	globalRank : String
	
},{collection : 'articleResFake'}); //override default collection name as web
var ArticleFakeResult = mongoose.model('ArticleFakeResult',ArticleSchemaFake);
/*** creating modal to instantiate website - Start *****/



/*** Construct Schema for website - End ***/


/***************/
app.get('/', function (req,res){
	res.send('hello world');
});

var website = [
	{article : "article_1", pages : [
		{name : 'page 1,1',widgets : [
			{name : 'widget 1 1 1'},
			{name : 'widget 1 1 2'},
			]
		},
		{name : 'page 1,2'},
		{name : 'page 1,3',widgets : [
			{name : 'widget 1 3 1'},
			{name : 'widget 1 3 2'},
			]
		},
	]
	},
	{article : "article_2", pages : [
		{name : 'page 2,1',widgets : [
			{name : 'widget 2 1 1'},
			{name : 'widget 2 1 2'},
		]},
		{name : 'page 2,2'},
		{name : 'page 2,3'},
	]
	},
	{article : "article_3", pages : [
		{name : "page 3 1", widgets : [
			{name : "widget 3 1 1"}
			]
		},
		{name : "page 3 2"}
	]
	}
];

app.get("/api/website", function (req,res){
	//res.json(website);
	WebsiteModel.find(function(err,data){
		res.json(data);
	}); //returns all the website from database
});

app.get("/article/featured", function (req,res){
	/*ArticleResult.find(function(err,data){
		res.json(data);
	});*/
	ArticleFakeResult.find(function(err,data){
		res.json(data);
	});
});

app.get("/article/final", function (req,res){
	/* ArticleFakeResult.find(function(err,data){
		res.json(data);
	}); */
	//algo(res);
	//fetchArticlesSearchResults(res);
	algoTrial(res);
});

app.get("/process", function (req,res){
	res.json(process.env);
});

/*app.get("/api/website/:id", function (req,res){
	res.json(website[req.params.id]);
});*/

//note : here the id is notthe same as the id in a collection..
//collection id is like primary key and would match with the id being passed from the front end
//that is why it is changed in front end from index to web._id
app.delete("/api/website/:id", function(req,res){
	WebsiteModel.findById(req.params.id,function(err,data){ //used to find a particular record in a collection
		data.remove();
		WebsiteModel.find(function(err,data){
			res.json(data);
		});
	});
});

app.delete("/api/website/:id/page/:pageId", function(req,res){
	website[req.params.id].pages.splice(req.params.pageId,1);
	res.json(website[req.params.id].pages);
});

app.delete("/api/del", function(req,res){
	emptyDB();	
});

var emptyDB = function(){
	mongoose.connection.db.dropCollection('articleRes', function(err, result) {
		console.log("success");
		ArticleResult.find(function(err,data){
			console.log(data);
		});
	});
}

app.post("/api/website", function(req,res){
	/** create instance of model ***/
	console.log(req.body);
	var site1 = new WebsiteModel(req.body);
	site1.save(function(){ //callback after save
		WebsiteModel.find(function(err,data){
			res.json(data);
		}); //returns all the website from database
	});
	//website.push(req.body);
	//res.json(website);
	
});
/*********/


/*** http req START *********/

var fileData = "";
//var fs = require('fs');
fs.readFile('./public/js/search_topic.json', 'utf8', function (err, data) {
  if (err) throw err;
  var jsonData = JSON.parse(data);
  fileData = jsonData; //remove later
  cronJob(jsonData);
  //findRandomValues(jsonData);
});

var cronJob = function(jsonData){
	var articleList = jsonData;
	var schedule = require('node-schedule');
	//cron job
	var rule = new schedule.RecurrenceRule();
	rule.dayOfWeek = [0, new schedule.Range(0, 6)];
	rule.hour = 4;
	rule.minute = 0;

	var j = schedule.scheduleJob(rule, function(){
	   console.log('put your task here')
	   findRandomValues(articleList);
	});
	
}
var GoogleSearch = require('google-search');
var customsearch = google.customsearch('v1');

const CX =  '013944438288227651400:j_0h0-dl6um'; //'009350078174429104185:0ikpzx1qvau'; //'009350078174429104185:ipchhljo5xm';   // search engine ID
const API_KEY = 'AIzaSyAWZQCb6PFB1Oq1ZqUR6oJLhgwiTlgIKeY';
//const API_KEY =  'AIzaSyD_65dKKxS7Ah2-PEJGYq0UnGJj3eMME8Y';
//const API_KEY =  'AIzaSyCD9BxueU8fEMyDVkDTla6N8wGfBwkR19Q';
//const SEARCH = 'credit card';
var artResult = [],count=0;

var findRandomValues = function(jsonData){
	var arr = []
	while(arr.length < 9){
		var randomnumber=Math.ceil(Math.random()*128)
		var found=false;
		for(var i=0;i<arr.length;i++){
			if(arr[i]==randomnumber){found=true;break}
		}
		if(!found)arr[arr.length]=randomnumber;
	}
	fetchArticles(arr,jsonData);
}
finalData = {};
finalD = [];
var fetchArticles = function(arr,jsonData){
	var queryIndex,query = "";
	var result = {
		title : "",
		iframeLink : "",
		snippet : "",
		imgUrl : ""
	};
	(arr.length > 0 ? emptyDB() : "");
	for(var i=0;i<arr.length;i++){
		queryIndex = "search_topics_" + arr[i];
		query = jsonData[arr[i]-1][queryIndex];
		console.log(arr);
		console.log(query);
		customsearch.cse.list({ cx: CX, q: query, auth: API_KEY }, function(err, resp) {
			finalData = resp;
			finalD.push(resp);
			if (err) {
				console.log('An error occured', err);
				return;
			}
			result = {
				title : resp.items[0].title.substring(0,30) + "...",
				iframeLink : resp.items[0].link,
				snippet : resp.items[0].snippet.substring(0,125) + "...",
				imgUrl : (resp.items[0].pagemap ? (resp.items[0].pagemap.cse_image && resp.items[0].pagemap.cse_image[0].src ? resp.items[0].pagemap.cse_image[0].src : (resp.items[0].pagemap.cse_thumbnail && resp.items[0].pagemap.cse_thumbnail[0].src ? resp.items[0].pagemap.cse_thumbnail[0].src : "images/default.jpg")) : "images/default.jpg")
				
			}
			artResult.push(result);
			if(artResult.length == 9){
				setData();
				setLoadMore();
			}
			console.log(artResult.length);
		}); 
	}
}
//fetchArticles();
var queryData = [],queryName = "";
var algoTrialFlag = 0;
var algoTrial = function(res){
	console.log("inside");
	var query = "";
	var options;
	var loopVar = 1;
	var path1,options = {host: '',path: ""}
	var myVar  = setInterval(function () {
		/* if(loopVar >= 16){
			finalres.sort(function(a, b) {
				return parseFloat(a.v) - parseFloat(b.v);
			});
			res.json(finalres);
			console.log(finalres);
		} */
		if(loopVar >= 131 && algoTrialFlag == 0){
			algoTrialFlag=1;
			finalres.sort(function(a, b) {
				return parseFloat(b.v) - parseFloat(a.v);
			});
			var topNine = finalres.splice(0,9);
			res.json(finalres);
			console.log("time out cleared!");
			clearInterval(myVar);
		} else {	
			query = "";
			queryData = [];
			for(var i = loopVar;i < loopVar+5;i++){
				query += fileData[i-1]["search_topics_" + i];
				query += (i!=loopVar+4 ? "," : "");
				queryData.push(fileData[i-1]["search_topics_" + i]);
			}
			loopVar = loopVar+5;
			console.log("query = " + query);
			
			path1 = '/trends/fetchComponent?hl=en-US&q='+query+'&cid=TIMESERIES_GRAPH_0&export=3&w=500&h=300';
			options = {
				host: 'http://www.google.com/trends/fetchComponent?hl=en-US&q='+query+'&cid=TIMESERIES_GRAPH_0&export=3&w=500&h=300',
				path: ""+path1
			};
		
			api(options,res);
		}
	}, 30000); //6minutes
	//}
}

var algo = function(res){
	
	var query = "";
	var options;
	var loopVar = 1;
	var path1,options = {host: '',path: ""}
	//console.log(fileData.length);
	//for(var loopVar = 1; loopVar <= 6;loopVar++){
	var myVar  = setInterval(function () {
		if(loopVar > 132){
			console.log("time out cleared!");
			clearInterval(myVar);
			res.json(masterData);
		} else {	
			query = "";
			if(loopVar==1){
				for(var i = loopVar;i < loopVar+5;i++){
					query += fileData[i-1]["search_topics_" + i];
					query += (i!=loopVar+4 ? "," : "");
					queryData.push(fileData[i-1]["search_topics_" + i]);
				}
				loopVar = loopVar+5;
			} else {
				console.log("queryName = " + queryName);
				query = fileData[loopVar-1]["search_topics_" + loopVar] + "," + queryName;
				queryData = [];
				queryData.push(fileData[loopVar-1]["search_topics_" + loopVar]);
				queryName = queryName.split(",");
				for(var i=0;i<4;i++){
					queryData.push(queryName[i]);
					console.log("queryData = " + queryData[i]);
				}
				loopVar++;
			}
			console.log("query = " + query);
			
			path1 = '/trends/fetchComponent?hl=en-US&q='+query+'&cid=TIMESERIES_GRAPH_0&export=3&w=500&h=300';
			options = {
				host: 'http://www.google.com/trends/fetchComponent?hl=en-US&q='+query+'&cid=TIMESERIES_GRAPH_0&export=3&w=500&h=300',
				path: ""+path1
			};
		
			apiOriginal(options,res);
		}
	}, 600000); //6 mins
	//}
}

finalres = [];
var api = function(options,res){
	console.log("in");
	http = require('http');
	 /* var callback = function(response) {
		var str = '';
		
		response.on('data', function (chunk) {
			str += chunk;
			console.log("in data");
		});

		response.on('end', function () {
			var resObj = JSON.parse(str.substring(62).slice(0,-2).replace(/new/gi, '"new').replace(/\)/gi,')"'));
			res.json(sortTopics(resObj));
		});
	}

	http.request(options, callback).end();  */
	console.log("in");
	var req = http.get( options.host, function(response) {
		var str = '';
        response.on('data', function(d) {
            str += d;
        });
        response.on('end', function() {
			//console.log(str);
			var resObj = JSON.parse(str.substr(62).slice(0,-2).replace(/new/gi, '"new').replace(/\)/gi,')"'));
			//res.json(resObj);
			
			finalres = finalres.concat(sortTopics(resObj)).sort(function(a, b) {
				return parseFloat(a.v) - parseFloat(b.v);
			});
			console.log(finalres);
        });
	}).on('error', function( e ) {
		console.error( 'error', e );
    })
}

var apiOriginal = function(options,res){
	console.log("in");
	http = require('http');
	console.log("in");
	var req = http.get( options.host, function(response) {
		var str = '';
        response.on('data', function(d) {
            str += d;
        });
        response.on('end', function() {
			console.log(str);
			var resObj = JSON.parse(str.substr(62).slice(0,-2).replace(/new/gi, '"new').replace(/\)/gi,')"'));
			masterData = sortTopicsOriginal(resObj);
        });
	}).on('error', function( e ) {
		console.error( 'error', e );
    })
}
var sortTopicsOriginal = function(resObj){
	var len = resObj.table.rows.length;
	var result = resObj.table.rows[len-1].c;
	var count=0;
	queryName = "";
	result.shift();//removes first element
	for(var obj in result){
		result[obj].f = queryData[count]
		count++;
	}
	
	result.sort(function(a, b) {
		return parseFloat(a.v) - parseFloat(b.v);
	});
	for(var i=1;i<result.length;i++){
		queryName += result[i].f;
		queryName +=  (i < 4 ? ",": "");
	}
	
	return(result);
	
}

var sortTopics = function(resObj){
	var len = resObj.table.rows.length;
	var result = resObj.table.rows[len-1].c;
	var count=0;
	queryName = "";
	result.shift();//removes first element
	for(var obj in result){
		result[obj].f = queryData[count]
		count++;
	}
	
	result.sort(function(a, b) {
		return parseFloat(a.v) - parseFloat(b.v);
	});
	/* for(var i=1;i<result.length;i++){
		queryName += result[i].f;
		queryName +=  (i < 4 ? ",": "");
	} */
	
	return(result);
	
}
var x = "";
var getGlobalRank = function(res,i){
	x = 0;
	if(res.substr(0, 4) == "www.") 
      res =  res.substr(4);
	console.log("res = " + res);
	var url = "https://www.similarweb.com/website/" + res;
	http = require('https');
	var req = http.get(url, function(response) {
		var str = '';
        response.on('data', function(d) {
            str += d;
        });
        response.on('end', function() {
			//console.log(str);
			var n = str.search("GlobalRank\":");
			var z = str.substr(n+13,n+8+12);
			x = z.substr(0,z.indexOf(","));
			trialFinalD[i].globalRank = x;
			console.log("trialFinalD[i].globalRank = " + trialFinalD[i].globalRank);
			//var resp = new ArticleFakeResult(trialFinalD[i]);
			//resp.save();
			//return x;
        });
	}).on('error', function( e ) {
		console.log(e);
    })
	
}

var setD = function(response){
	/* trialFinalD.sort(function(a,b){
		return new Date(b.date) - new Date(a.date);
	}); */
	var i=-1;
	/* for(var i=0;i<trialFinalD.length;i++){
		res = new ArticleFakeResult(trialFinalD[i]);
		res.save();
	} */
	var myVar1  = setInterval(function () {
		
		if(i < trialFinalD.length-1){
			i++;
			console.log("value of i = " + i);
			getGlobalRank(trialFinalD[i].displayLink,i);
		} else{
			clearInterval(myVar1);
			calculateRank();
			response.json(trialFinalD);
		}
	},9000);
}

var calculateRank = function(){
	var alpha =1000000000,beta=10,gamma=100000;
	var ranks = [9,8,7,6,5,4,3,2,1];
	var str,res,val,rank,resp;
	for(var i=0;i<trialFinalD.length;i++){
		str = trialFinalD[i].date.split("-");
		res = str[0]+str[1]+str[2];
		val = (i + (10 - (i%10)))/10;
		
		rank = alpha * ranks[val-1] + beta * res + gamma * trialFinalD[i].globalRank;
		trialFinalD[i].rank = rank;
	}	
	
	trialFinalD.sort(function(a, b) {
		return a.rank - b.rank;
	});
	
	for(i=0;i<trialFinalD.length;i++){
		resp = new ArticleFakeResult(trialFinalD[i]);
		resp.save();
	}
}

var trialFinalD = [];
var flag = 0;
var fetchArticlesSearchResults = function(res){
	if(flag == 0){
		flag=1;
	var finalData = [];
	console.log("immmmmmmm insideeeeeeeeeeeeeeeeeeee");
	//getGlobalRank(res);
	//return;
	var searchTopics = ["finance planning","fiancial goals","time and value of money","career choice","employment search","employee benefits","career development","money management","budgeting"];
	var ranks = [9,8,7,6,5,4,3,2,1];
	var queryIndex,query = "";
	var result = {
		title : "",
		iframeLink : "",
		date:"",
		snippet : "",
		imgUrl : "",
		displayLink:"",
		rank : "",
		globalRank : ""
	};
	//(arr.length > 0 ? emptyDB() : "");
	var i=0;
	var k=-1;
	var myVar  = setInterval(function () {
		if(i<searchTopics.length){
			query = searchTopics[i];
			console.log(query);
			customsearch.cse.list({ cx: CX, q: query, auth: API_KEY }, function(err, resp) {
				finalData.push(resp);
				if (err) {
					console.log('An error occured', err);
					return;
				}
				console.log(resp.items.length);
				for(var k=0;k<resp.items.length;k++){
					result = {
						title : resp.items[k].title.substring(0,30) + "...",
						iframeLink : resp.items[k].link,
						date : (resp.items[k].pagemap && resp.items[k].pagemap.metatags && resp.items[k].pagemap.metatags[0]["article:modified"]) ? resp.items[k].pagemap.metatags[0]["article:modified"] :(new Date().getFullYear())+"-"+("0" + (new Date().getMonth() + 1)).slice(-2)+"-"+ ("0" + new Date().getDate()).slice(-2),
						snippet : resp.items[k].snippet.substring(0,125) + "...",
						imgUrl : (resp.items[k].pagemap ? (resp.items[k].pagemap.cse_image && resp.items[k].pagemap.cse_image[0].src ? resp.items[k].pagemap.cse_image[0].src : (resp.items[k].pagemap.cse_thumbnail && resp.items[k].pagemap.cse_thumbnail[0].src ? resp.items[k].pagemap.cse_thumbnail[0].src : "images/default.jpg")) : "images/default.jpg"),
						displayLink : resp.items[k].displayLink ? resp.items[k].displayLink : "",
						rank : "0",
						globalRank : "0"
					}
					trialFinalD.push(result);					
				}
				i++;
			}); 		
		} else {
			clearInterval(myVar);
			//res.json(finalData);
			setD(res);
		}
	}, 9000);
	}
}
//fetchArticlesSearchResults();

var setData = function(){
	var res;
	for(var i=0;i<9;i++){
		res = new ArticleResult(artResult[i]);
		res.save();
	}
}
var setLoadMore = function(){
	var result = {
		title : "",
		iframeLink : "",
		snippet : "",
		imgUrl : ""
	},loadMoreRes = [],res,count=1;
	for(var k=0;k<9;k++){
		for(var j=0;j<9;j++){
			console.log("j="+j);
			result = {
				title : finalD[j].items[count].title.substring(0,30) + "...",
				iframeLink : finalD[j].items[count].link,
				snippet : finalD[j].items[count].snippet.substring(0,125) + "...",
				imgUrl : (finalD[j].items[count].pagemap ? (finalD[j].items[count].pagemap.cse_image && finalD[j].items[count].pagemap.cse_image[0].src ? finalD[j].items[count].pagemap.cse_image[0].src : (finalD[j].items[count].pagemap.cse_thumbnail && finalD[j].items[count].pagemap.cse_thumbnail[0].src ? finalD[j].items[count].pagemap.cse_thumbnail[0].src : "images/default.jpg")) : "images/default.jpg")
			}
			loadMoreRes.push(result);
		}
		count++;
	}
	
	
	for(var i=0;i<loadMoreRes.length;i++){
		res = new ArticleResult(loadMoreRes[i]);
		res.save();
	}
}
/**************************/

var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.listen(port,ip);