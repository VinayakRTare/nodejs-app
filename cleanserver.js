/**
 * Created by dhinesh kumar on 11/10/2017.
 */
"use strict";
//  OpenShift sample Node application
var express = require('express');
var app = express();
var morgan = require('morgan');

Object.assign = require('object-assign');

app.engine('html', require('ejs').renderFile);
app.use(morgan('combined'));

var searchTopics = [{'search_topics_1': 'Financial%20Planning'}, {'search_topics_2': 'Career%20Planning'}, {'search_topics_3': 'Financial%20Planners'}, {'search_topics_4': 'Financial%20Goals'}, {'search_topics_5': 'Time%20Value%20of%20Money'}, {'search_topics_6': 'Money%20Management'}, {'search_topics_7': 'Financial%20Record%20System'}, {'search_topics_8': 'Personal%20Financial%20Statements'}, {'search_topics_9': 'Budgeting'}, {'search_topics_10': 'Savings'}, {'search_topics_11': 'Payment%20Methods'}, {'search_topics_12': 'Bank%20Currency'}, {'search_topics_13': 'Insurance%20Companies'}, {'search_topics_14': 'Private%20Insurance%20Companies'}, {'search_topics_15': 'Financial%20Advisors'}, {'search_topics_16': 'Career%20Choice'}, {'search_topics_17': 'Employment%20Search'}, {'search_topics_18': 'Employee%20Benefits'}, {'search_topics_19': 'Career%20Development'}, {'search_topics_20': 'Taxes'}, {'search_topics_21': 'Tax%20Refunds'}, {'search_topics_22': 'Tax%20Advance%20Loans'}, {'search_topics_23': 'Federal%20Income%20Taxes'}, {'search_topics_24': 'Tax%20Deductions'}, {'search_topics_25': 'Tax%20Credits'}, {'search_topics_26': 'Tax%20Planning'}, {'search_topics_27': 'Tax%20Preparers'}, {'search_topics_28': 'Tax%20Advisors'}, {'search_topics_29': 'Major%20Purchases'}, {'search_topics_30': 'Bankers'}, {'search_topics_31': 'Consumer%20Credit'}, {'search_topics_32': 'Types%20of%20Credit'}, {'search_topics_33': 'Revolving%20Loans'}, {'search_topics_34': 'Open%20Ended%20Loans'}, {'search_topics_35': 'Close%20Ended%20Loans'}, {'search_topics_36': 'Revolving%20Loans'}, {'search_topics_37': 'Credit%20Capacity'}, {'search_topics_38': 'Debt%20History'}, {'search_topics_39': 'Applying%20for%20Credit'}, {'search_topics_40': 'Interest%20Rates'}, {'search_topics_41': 'Credit%20History'}, {'search_topics_42': 'Credit%20Scores'}, {'search_topics_43': 'Credit%20Counseling'}, {'search_topics_44': 'Consumer%20Rights'}, {'search_topics_45': 'Predatory%20Lending%20Practices%20'}, {'search_topics_46': 'Bank%20Corruption'}, {'search_topics_47': 'Title%20Loans'}, {'search_topics_48': 'Debt%20Collection'}, {'search_topics_49': 'Bankruptcy'}, {'search_topics_50': 'Chapter%2011%20Bankruptcy'}, {'search_topics_51': 'Pawn%20Shops'}, {'search_topics_52': 'Tax%20Advance%20Loans'}, {'search_topics_53': 'Payday%20Loans'}, {'search_topics_54': 'Rent%20to%20Own'}, {'search_topics_55': 'Tax%20Refund%20Anticipation%20Loans'}, {'search_topics_56': 'Real%20Estate%20Brokers'}, {'search_topics_57': 'Housing'}, {'search_topics_58': 'Home%20Buying'}, {'search_topics_59': 'Property%20Providers'}, {'search_topics_60': 'Brokers%20Price%20Opinio%20BPO'}, {'search_topics_61': 'Mortgages'}, {'search_topics_62': 'Renting'}, {'search_topics_63': 'Homeowners%20Insurance'}, {'search_topics_64': 'Property%20Insurance'}, {'search_topics_65': 'Mortgage%20Insurance'}, {'search_topics_66': 'Renters%20Insurance'}, {'search_topics_67': 'Car%20Shopping'}, {'search_topics_68': 'Auto%20Loans'}, {'search_topics_69': 'Home%20Selling'}, {'search_topics_70': 'Liability%20Insurance'}, {'search_topics_71': 'Auto%20Insurance'}, {'search_topics_72': 'Health%20Plans'}, {'search_topics_73': 'Home%20Health%20Care'}, {'search_topics_74': 'Health%20Maintenance%20Organizations%20HMOs'}, {'search_topics_75': 'Preferred%20Provider%20Organization%20PPOs'}, {'search_topics_76': 'Medical%20Service%20Plans'}, {'search_topics_77': 'Health%20Insurance'}, {'search_topics_78': 'Medical%20Insurance'}, {'search_topics_79': 'Medicare'}, {'search_topics_80': 'Medicaid'}, {'search_topics_81': 'Bodily%20Injury%20Insurance'}, {'search_topics_82': 'Short%20Term%20Disability%20Insurance%20'}, {'search_topics_83': 'Long%20Term%20Disability%20Insurance%20'}, {'search_topics_84': 'Whole%20Life%20Insurance'}, {'search_topics_85': 'Turned%20Life%20Insurance'}, {'search_topics_86': 'Short%20Term%20Insurance'}, {'search_topics_87': 'Term%20Life%20Insurance'}, {'search_topics_88': 'Annuities'}, {'search_topics_89': 'Insurance%20Beneficiaries%20'}, {'search_topics_90': 'Child%20Custody'}, {'search_topics_91': 'Custody'}, {'search_topics_92': 'Investments'}, {'search_topics_93': 'Investment%20Goals'}, {'search_topics_94': 'Investment%20Strategies'}, {'search_topics_95': 'Investment%20Income'}, {'search_topics_96': 'Investment%20Growth'}, {'search_topics_97': 'Investment%20Equity'}, {'search_topics_98': 'Investment%20Risks'}, {'search_topics_99': 'Investment%20Alternatives'}, {'search_topics_100': 'Asset%20Allocation'}, {'search_topics_101': 'Diversification'}, {'search_topics_102': 'Modern%20Markets'}, {'search_topics_103': 'Capital%20Markets'}, {'search_topics_104': 'Stocks'}, {'search_topics_105': 'Mutual%20Funds'}, {'search_topics_106': 'Real%20Estate'}, {'search_topics_107': 'Real%20Estate%20Investment%20Trusts%20REITs'}, {'search_topics_108': 'Common%20Stock'}, {'search_topics_109': 'Preferred%20Stock'}, {'search_topics_110': 'Corporate%20Bonds'}, {'search_topics_111': 'Government%20Bonds'}, {'search_topics_112': 'Municipal%20Bonds'}, {'search_topics_113': 'Convertible%20Bonds'}, {'search_topics_114': 'Exchange%20Traded%20Funds'}, {'search_topics_115': 'Index%20Funds'}, {'search_topics_116': 'Precious%20Metals'}, {'search_topics_117': 'Collectibles'}, {'search_topics_118': 'Gold'}, {'search_topics_119': 'Stock%20Brokers'}, {'search_topics_120': 'Investment%20Bankers'}, {'search_topics_121': 'Financial%20Analysts'}, {'search_topics_122': 'Retirement'}, {'search_topics_123': 'Retirement%20Planning'}, {'search_topics_124': 'Retirement%20Housing'}, {'search_topics_125': 'Retirement%20Income'}, {'search_topics_126': 'Retirement%20Living%20Expenses'}, {'search_topics_127': 'Social%20Security'}, {'search_topics_128': 'Pensions'}, {'search_topics_129': 'Public%20Pensions'}, {'search_topics_130': 'Employer%20Pensions'}, {'search_topics_131': 'Personal%20Retirement%20Plans'}, {'search_topics_132': 'Individual%20Retirement%20Accounts'}, {'search_topics_133': 'Roth%20Individual%20Retirement%20Accounts'}, {'search_topics_134': '401%20A'}, {'search_topics_135': '401%20B'}, {'search_topics_136': '401%20K'}, {'search_topics_137': '403%20B'}, {'search_topics_138': '457'}, {'search_topics_139': 'Thrift%20Savings%20Plan%20TSP'}, {'search_topics_140': 'Retirement%20Employment'}, {'search_topics_141': 'Wills'}, {'search_topics_142': 'Power%20of%20Attorney'}, {'search_topics_143': 'Letter%20of%20Lest%20Instruction'}, {'search_topics_144': 'Trusts'}, {'search_topics_145': 'Trustees'}, {'search_topics_146': 'Estate'}, {'search_topics_147': 'Probate'}, {'search_topics_148': 'Lawyers'}, {'search_topics_149': 'debit%20collection'}, {'search_topics_150': 'home%20owners%20insurance'}, {'search_topics_151': 'estate%20planning'}, {'search_topics_152': 'credit%20card'}, {'search_topics_153': 'Personal%20Financial%20Planning'}, {'search_topics_154': 'Credit%20and%20Loans'}, {'search_topics_155': 'Your%20Health%20and%20Life'}, {'search_topics_156': 'Investing'}, {'search_topics_157': 'Planning%20for%20Retirement%20'}, {'search_topics_158': 'Wills'}, {'search_topics_159': 'Power%20of%20Attorney'}, {'search_topics_160': 'Letter%20of%20Lest%20Instruction'}];
var bodyParser = require('body-parser');
var multer = require('multer');

var google = require('googleapis');

var mongoose = require('mongoose');
var fs = require('fs');

var googleTrends = require('google-trends-api');
var alexaData = require('alexa-traffic-rank');

// app.use(bodyParser.json()); //for parsing app
// app.use(bodyParser.urlencoded({extended:true})); // for parsing th eapp
// app.use(multer()); //for parsing multipart

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
    mongoURLLabel = '';

if(mongoURL == null && process.env.DATABASE_SERVICE_NAME) {
    var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
        mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'],
        mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'],
        mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
        mongoPassword = process.env[mongoServiceName + '_PASSWORD'],
        mongoUser = process.env[mongoServiceName + '_USER'];

    if(mongoHost && mongoPort && mongoDatabase) {
        mongoURLLabel = mongoURL = 'mongodb://';
        if(mongoUser && mongoPassword) {
            mongoURL += mongoUser + ':' + mongoPassword + '@';
        }
        // Provide UI label that excludes user id and pw
        mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
        mongoURL += mongoHost + ':' + mongoPort + '/' + mongoDatabase;

    }
}

var db = null,
    dbDetails = new Object();

var initDb = function(callback) {
    if(mongoURL == null) return;

    if(mongoose == null) return;

    mongoose.connect(mongoURL, function(err) {
        if (err) {
            callback(err);
            return;
        }

        // db = conn;
        dbDetails.databaseName = 'moneyabcsdb';
        dbDetails.url = mongoURLLabel;
        dbDetails.type = 'MongoDB';

        console.log('Connected to MongoDB at: %s', mongoURL);
    });
};

app.get('/', function(req, res) {
    // try to initialize the db on every request if it's not already
    // initialized.
    if(!db) {
        initDb(function(err) {
            console.log(err);
        });
    }
    if(db) {
        var col = db.collection('counts');
        // Create a document with request IP and current time of request
        col.insert({ip: req.ip, date: Date.now()});
        col.count(function(err, count) {
            console.log(err);
            res.render('index.html', { pageCountMessage: count, dbInfo: dbDetails });
        });
    } else{
        res.render('index.html', { pageCountMessage: null});
    }
});

app.get('/pagecount', function(req, res) {
    // try to initialize the db on every request if it's not already
    // initialized.
    if(!db) {
        initDb(function(err) {});
    }
    if(db) {
        db.collection('counts').count(function(err, count ) {
            res.send('{ pageCount: ' + count + '}');
        });
    } else{
        res.send('{ pageCount: -1 }');
    }
});


// algo start
/** Construct Schema for website - Start ***/
var WebsiteSchema = new mongoose.Schema({
    article: String
}, {collection: 'web'}); // override default collection name as web

/** creating modal to instantiate website - Start *****/
var WebsiteModel = mongoose.model('WebsiteModel', WebsiteSchema);

/** Construct Schema for website - End ***/

/** Construct Schema for search results of 9 articles - Start ***/
var ArticleSchema = new mongoose.Schema({
    title: String,
    iframeLink: String,
    snippet: String,
    imgUrl: String

}, {collection: 'articleRes'}); // override default collection name as web
var ArticleResult = mongoose.model('ArticleResult', ArticleSchema);

/** Construct Schema for search results of 9 articles - Start ***/
var ArticleSchemaFake = new mongoose.Schema({
    title: String,
    iframeLink: String,
    date: String,
    snippet: String,
    imgUrl: String,
    displayLink: String, // domain
    rank: String,
    globalRank: String,
    index: '',
    indexTopic: '',
    topicRank: ''
}, {collection: 'articleResFake'}); // override default collection name as web
var ArticleFakeResult = mongoose.model('ArticleFakeResult', ArticleSchemaFake);
var ArticleSchema = new mongoose.Schema({
    title: String,
    iframeLink: String,
    date: String,
    snippet: String,
    imgUrl: String,
    displayLink: String, // domain
    rank: String,
    globalRank: String,
    index: '',
    indexTopic: '',
    topicRank: '',
    daysInLead: ''
}, {collection: 'articleFeaturedRes'});
var ArticleFeaturedResult = mongoose.model('ArticleFeaturedResult', ArticleSchema);

/***************/

/** Construct Schema for search results of 9 articles - Start ***/
var ArticleSearchFake = new mongoose.Schema({
    _id: { '$oid': ''},
    title: String,
    iframeLink: String,
    date: String,
    snippet: String,
    imgUrl: String,
    displayLink: String,
    topicRank: String, // found using fetchcomponent
    topicName: String,
    topicArrIndex: String,
    '__v': ''

}, {collection: 'articleSearchRes'}); // override default collection name as web
var ArticleSearchResult = mongoose.model('ArticleSearchResult', ArticleSearchFake);

var ArticleSearchFake1 = new mongoose.Schema({
    _id: {'$oid': ''},
    title: String,
    iframeLink: String,
    date: String,
    snippet: String,
    imgUrl: String,
    displayLink: String,
    // rank: String, //not required.. compute for cron job algorithm
    // globalRank: String, //not required.. compute for cron job algorithm
    index: '',
    '__v': ''
}, {collection: 'articleSearchRes1'}); // override default collection name as web
var ArticleSearchResult1 = mongoose.model('ArticleSearchResult1', ArticleSearchFake1);

/***************/
/** Search index start */
var searchArticleIndex = new mongoose.Schema({
    searchIndex: ''

}, {collection: 'searchIndexVal'}); // override default collection name as web
var searchIndex = mongoose.model('searchIndex', searchArticleIndex);
/** search index end *********/

var website = [
    {article: "article_1", pages: [
        {name: 'page 1,1',widgets: [
            {name: 'widget 1 1 1'},
            {name: 'widget 1 1 2'},
        ]
        },
        {name: 'page 1,2'},
        {name: 'page 1,3',widgets: [
            {name: 'widget 1 3 1'},
            {name: 'widget 1 3 2'},
        ]
        },
    ]
    },
    {article: "article_2", pages: [
        {name: 'page 2,1',widgets: [
            {name: 'widget 2 1 1'},
            {name: 'widget 2 1 2'},
        ]},
        {name: 'page 2,2'},
        {name: 'page 2,3'},
    ]
    },
    {article: "article_3", pages: [
        {name: "page 3 1", widgets: [
            {name: "widget 3 1 1"}
        ]
        },
        {name: "page 3 2"}
    ]
    }
];
var testAPi = function() {
// app.get("/testApi", function(req,res){
    ArticleFeaturedResult.find(function(err, data) {
        console.log(data);
    }); // returns all the website from database
// });
}
// testAPi();
app.get('/article/featured', function(req, res) {
    // cronJob(res);
    // algoTrial(res);
    ArticleFakeResult.find(function(err, data) {
        res.json(data);
    });
});

app.get('/article/final', function(req, res) {
    console.log('in final');
    // cronJob(res);
    ArticleFakeResult.find(function(err, data) {
        res.json(data);
    });
    // searchData(res);
});

app.get('/process', function(req, res) {
    res.json(process.env);
});

app.post('/searchSample', function(req, res) {
    // console.log(req.body.name);
    searchSample(req.body.name, res);
    // res.json('heeeeeeeeeeeeee');
});

//  note : here the id is notthe same as the id in a collection..
// collection id is like primary key and would match with the id being passed from the front end
// that is why it is changed in front end from index to web._id
app.delete('/api/website/:id', function(req, res) {
    WebsiteModel.findById(req.params.id, function(err, data) { // used to find a particular record in a collection
        data.remove();
        WebsiteModel.find(function(err, data) {
            res.json(data);
        });
    });
});

app.delete('/api/website/:id/page/:pageId', function(req, res) {
    website[req.params.id].pages.splice(req.params.pageId, 1);
    res.json(website[req.params.id].pages);
});

app.delete('/api/del', function(req, res) {
    emptyDB();
});

var emptyDB = function(){
    /* mongoose.connection.db.dropCollection('articleRes', function(err, result) {
     console.log('success');
     ArticleResult.find(function(err,data){
     console.log(data);
     });
     }); */
    mongoose.connection.db.dropCollection('articleFeaturedResult', function(err, result) {
        // console.log('success');
        /* ArticleFakeResult.find(function(err,data){
         console.log(data);
         }); */
    });
}

app.post('/api/website', function(req, res) {
    /** create instance of model ***/
    console.log(req.body);
    var site1 = new WebsiteModel(req.body);
    site1.save(function() { // callback after save
        WebsiteModel.find(function(err, data) {
            res.json(data);
        }); // returns all the website from database
    });
    // website.push(req.body);
    // res.json(website);

});
/*********/
/** http req START ***/

var fileData = '';
/* var fs = require('fs');
 fs.readFile('./public/js/searchData.json', 'utf8', function(err, data) {
 if (err) throw err;

 var jsonData = JSON.parse(data);
 console.log(jsonData.length);

 mongoose.connection.db.dropCollection('articleSearchRes', function(err, result) {
 console.log('success');
 ArticleSearchResult.collection.insert(jsonData, function(err, result) {
 if (err) {
 console.log(err);
 } else {
 console.log('Inserted');
 }
 });
 });


 }); */
var AlgoStartTime = 0;
var cronJob = function(){
    console.log('m here');
    var schedule = require('node-schedule');
    // cron job
    var rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = new schedule.Range(0, 6);
    // ////CST////////
    // rule.hour = 22;
    // rule.minute = 00;
    // ////Server timing - UTC////////
    rule.hour = 4;
    rule.minute = 0;
    var j = schedule.scheduleJob(rule, function() {
        console.log('start Algo trail 10 PM');
        AlgoStartTime = Date.now();
        algoTrial();

    });

    rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = new schedule.Range(0, 6);
    // ////CST////////
    // rule.hour = 06;
    // rule.minute = 00;
    // ////Server timing - UTC////////
    rule.hour = 12;
    rule.minute = 0;
    console.log(rule);
    var ksch = schedule.scheduleJob(rule, function() {
        console.log('start Algo trail 6 AM');
        AlgoStartTime = Date.now();
        algoTrial();
    });

    rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = new schedule.Range(0, 6);
    // ////CST////////
    // rule.hour = 14;
    // rule.minute = 00;
    // ////Server timing - UTC////////
    rule.hour = 20;
    rule.minute = 0;
    var lsch = schedule.scheduleJob(rule, function() {
        console.log('start Algo trail 2 PM');
        AlgoStartTime = Date.now();
        algoTrial();
    });
}

cronJob();

// var testcron = function(){
//     var schedule = require('node-schedule');
//     var rule = new schedule.RecurrenceRule();
//     rule.dayOfWeek = new schedule.Range(0, 6);
//     rule.hour = 14;
//     rule.minute = 34;
//     var j = schedule.scheduleJob(rule, function(){
//         console.log('test cron');
//     });
//
// };
// testcron();

// var schedule = require('node-schedule');
// var l = schedule.scheduleJob('2 * * * *',function(){
//     console.log('Log for every 2 min')
// });
//
// var cron = require('node-cron');
// cron.schedule('1 * * * *',function(){
//     console.log('runnig evryr 1 min')
// });

var GoogleSearch = require('google-search');
var customsearch = google.customsearch('v1');
// https://developers.google.com/custom-search/json-api/v1/reference/cse/list
const CX =  '013944438288227651400:j_0h0-dl6um'; // '009350078174429104185:0ikpzx1qvau'; //'009350078174429104185:ipchhljo5xm';   // search engine ID
// //const API_KEY = 'AIzaSyAWZQCb6PFB1Oq1ZqUR6oJLhgwiTlgIKeY';
const API_KEY = 'AIzaSyD_65dKKxS7Ah2-PEJGYq0UnGJj3eMME8Y';

// browser key
var searchObj = [
    'AIzaSyA8PeWFR7NVRUifiE2s15uQsq9lhDZToz0', // 1
    'AIzaSyBHoDhKqnA6rSVgchTOc7rnJygtKK4NRaQ', // 2
    'AIzaSyBNv80R-PLU4RpyjwzZNpZ3G8kdKRwqi30', // 3
    'AIzaSyD9Z2wkCZjy6zMF0GhREYd_fERwMLB0QO4', // 4
    'AIzaSyDND7y5XQKZsaaeF5pg8iX5FiBOT_nYxRc', // 5
    'AIzaSyCIUSFtT7VnBKltL-cSyMeP-4nLVRBuTyw', // 6
    'AIzaSyAhKt1T6wF0J_KaDyEQz2n-urln1RD_Jtw'  // 7
];

/* const searchObj = ['AIzaSyCD9BxueU8fEMyDVkDTla6N8wGfBwkR19Q'
 ,'AIzaSyCU8PsxEOiE5wRqr4HxRjzBOUU6jX2i-Z0'
 ,'AIzaSyCogjzgjqbELSwOZ9HEYVGMJ4xZ4uuSdeM'
 ,'AIzaSyCOvjltO3a7CMPnf62PGi5-jr2KiSCZm0I'
 ,'AIzaSyA-NUNkGj7D3WXVmgiDq9RqZmuNg5Aqhvg'
 ,'AIzaSyASoZ-t1J-n1gS4LHWF2bpUIe20nwG01ds'
 ,'AIzaSyBeezOHAvxS3JnB6POKDmOELjNj1H722PU'
 ,'AIzaSyC8mj-A3_I9TijP-5CPjavsK1jpMMNJaXo'
 ,'AIzaSyAXzrZWRupNBW2YaSQRRaqe7cF8dgAXjtc'
 ,'AIzaSyADPOl_iivtmpntVB1OxQUpF3RCnX_BTk4'
 ,'AIzaSyCVqKI4RQPmM7OmBDlGw9mLyqaOnVhG0i4'
 ,'AIzaSyAJUaHWJw93SZ1D_KchfkfklcXkTofW714'
 ,'AIzaSyCb7vg14hDr_aCmaxg-oy-gv-D78QSGiFg',
 'AIzaSyCMYam_TLKH5Nvog0fgJS5A5Fqp0J7EWqQ',
 'AIzaSyAEOKdZtgalWFPM9u_KtL1nbg209cDk2mI',
 'AIzaSyAkKiAiEd98_poLcX6N7GcbvezZq0-8zjg',
 'AIzaSyBRZiqMw9vXztXe4ENPzrUgNuaZuCu4VMw',
 'AIzaSyCmaYuaMhbJo0e5Ag7-WijYHZXwQnlDcGE',
 'AIzaSyA7p6RzOdJZ7Y75k3O55mCo2Z9uhe8-DZA']; */

/* const searchObj = [
 'AIzaSyD_65dKKxS7Ah2-PEJGYq0UnGJj3eMME8Y',
 'AIzaSyCD9BxueU8fEMyDVkDTla6N8wGfBwkR19Q',
 'AIzaSyCU8PsxEOiE5wRqr4HxRjzBOUU6jX2i-Z0',
 'AIzaSyCogjzgjqbELSwOZ9HEYVGMJ4xZ4uuSdeM',
 'AIzaSyCOvjltO3a7CMPnf62PGi5-jr2KiSCZm0I',
 // mine 2 start
 'AIzaSyAYZ0TJohSurrDD4itwcgAxadmfEEKT1kM',
 'AIzaSyDpBJmZLyNK8abeV23s9YV_0lJo7jB1hqA',
 'AIzaSyC1fNFVuFhKJfvo7x_XUEW0pFYC9CYRD_o',
 'AIzaSyDXMx__savGCf11lUE_4pPqwRbU1yyX0-A',
 'AIzaSyCm-1oQuYtSTQg6rgo3UGW3aTU53j-IHOc',
 // mine ends here
 // mine 3 strat
 'AIzaSyAZNwhU2TJP4-nHmNeLU1t0Iv1LNuvIYoA',
 'AIzaSyD7yWwQ062mJgXH7Tpa_u-chkHRg9av49c',
 'AIzaSyCNH7IkLWeD1H_fMqCT72Mh28aHqRXQ2tY',
 'AIzaSyABuqyYbK8O9nKhNoFBYgY2kIoG1rM4vYc',
 'AIzaSyBHPjvV4PiEYFgqmPH9fxmR2tAykboseFI',
 // mine end
 ];
 */
/* const searchObj = [
 // dhinesh start
 'AIzaSyBpCS5jf4Gqrd7CITK55kxJBy1E773T2gM',
 'AIzaSyDaXFMhv10sabu5ep91m07edudI_eEc64w',
 'AIzaSyDtqD5aMHVkfQn977R8Wn4DE1IPt4rsWLE',
 'AIzaSyCzUgzWHpHqw51KRYVMUGn5ONkvky4gZbo',
 'AIzaSyBBEqv9JA5oxcYmZctkT-zaiWq1hNX4PAA',
 // dhinesh end
 // jothi start
 'AIzaSyDNfGUJ_AL_vSVCIx8RPFtMrGH9OOe35-I',
 'AIzaSyD54rDObjC8iUMEblBwmP3FxPouxr6-0d4',
 'AIzaSyBG4h22aC_Dg0o5t0ckODSFJMAMmSlMJg',
 'AIzaSyDZ-XsjwyTgUSNeNAE7c7PKjT8tfNpBurE',
 'AIzaSyD4yi0SLe0w5UZiGpiC1BmF2Hk5ROqCn9c',
 // jothi end

 // mine 2 start
 'AIzaSyAYZ0TJohSurrDD4itwcgAxadmfEEKT1kM',
 'AIzaSyDpBJmZLyNK8abeV23s9YV_0lJo7jB1hqA',
 'AIzaSyC1fNFVuFhKJfvo7x_XUEW0pFYC9CYRD_o',
 'AIzaSyDXMx__savGCf11lUE_4pPqwRbU1yyX0-A',
 'AIzaSyCm-1oQuYtSTQg6rgo3UGW3aTU53j-IHOc',
 // mine ends here
 // mine 3 strat
 'AIzaSyAZNwhU2TJP4-nHmNeLU1t0Iv1LNuvIYoA',
 'AIzaSyD7yWwQ062mJgXH7Tpa_u-chkHRg9av49c',
 'AIzaSyCNH7IkLWeD1H_fMqCT72Mh28aHqRXQ2tY',
 'AIzaSyABuqyYbK8O9nKhNoFBYgY2kIoG1rM4vYc',
 'AIzaSyBHPjvV4PiEYFgqmPH9fxmR2tAykboseFI',
 // mine end
 // mine 4 start
 'AIzaSyDFl2qrjcLHWTheJhQCeVAVwkwad-K0ZCY',
 'AIzaSyAKivfvhi50IS1ANCOE9DK6VPqabkGNRNQ',
 'AIzaSyBLZY_t9CVp-Ro8Eb85Ihn305BGntDar8Y',
 'AIzaSyCkBtVLtSvkMfqwmPLqFVD4dnyMWo2huNc',
 'AIzaSyAPWGpi2V5nwPsRL9tvbJ4rHlxeH09p2f4',
 // mine end
 // mine 1 start
 'AIzaSyDGjwUycNTVh0iVkO-S7TKnXrArzlE53d0',
 'AIzaSyBz4GtVdywuLUYQ6ihM9Dn2d813BsWyQ7o',
 'AIzaSyBiqQBfOBz-eR2M0oqmB7iEF-4HR4BKTgs',
 'AIzaSyCdlENATNxnrrujgEsRDJPPWvhzFuSye08',
 'AIzaSyDtNUhL69ILW4DV340Vg4mMpZZjEDXn-Qo',

 // mine ends here

 'AIzaSyBM3mLcke9aeqPxFLBliIFz9jwL1HC4MY4',
 'AIzaSyBd0rEy3X7L-MR5Yx0BbGR2WsOg8WRZkX0',
 'AIzaSyA3CDN3Mznfy7ozWme_cGX-hUJ2k8XsDVs',
 'AIzaSyAq09SXaUHZ6wkLovBS2Kyo_31iAOFWOZ0',
 'AIzaSyA_KcQZLnab0YI_KJRsTKNsbxwuV0GaFwU',
 'AIzaSyCHm9zluLr7uDL1Ui_Izs4mhmH-mpVcUCc',
 'AIzaSyCcuY-oi637kB7gcU3yFVQ9O-PdnYlaAmE',
 'AIzaSyBAv69_166Lzkk7U7mgULvmoBu8XufgLsU',
 'AIzaSyCRayeg8J1bXHfbvV40yatNqm6tnxW4szo',
 'AIzaSyD_ibziFibMTg06IuQloV2N2i5KfpUeMH4',
 'AIzaSyAGRU7tedvf3oMINv0OjZq6Qf6YCjAi6RQ',
 'AIzaSyCLPuAGkhyF_0h5alhg_x1zUpHySM72txQ',
 'AIzaSyBQVcpreu728K-rUEeootBB-NT8r7Yg6GE',
 'AIzaSyC8VvIazwQrrbHLaNKb0YRfLVxekCb5Xtc',
 'AIzaSyA1NkEPX-Gl068VFLOeqx6XRK38MuwKYdk',
 'AIzaSyBt9hrkMTMHa-2sPpKbKNPoZy0OlWBPvpE',
 'AIzaSyC6ftxJr5WluWY5bJyGgoZ2qNjoF2sFOik',] */

// const API_KEY1 = 'AIzaSyD_65dKKxS7Ah2-PEJGYq0UnGJj3eMME8Y';
// const API_KEY2 = 'AIzaSyCD9BxueU8fEMyDVkDTla6N8wGfBwkR19Q';
// const API_KEY3 = 'AIzaSyCU8PsxEOiE5wRqr4HxRjzBOUU6jX2i-Z0';
// const API_KEY4 = 'AIzaSyCogjzgjqbELSwOZ9HEYVGMJ4xZ4uuSdeM';
// const API_KEY5 = 'AIzaSyCOvjltO3a7CMPnf62PGi5-jr2KiSCZm0I';
// const API_KEY6= 'AIzaSyA-NUNkGj7D3WXVmgiDq9RqZmuNg5Aqhvg';
// const API_KEY7 = 'AIzaSyASoZ-t1J-n1gS4LHWF2bpUIe20nwG01ds';
// const API_KEY8 = 'AIzaSyBeezOHAvxS3JnB6POKDmOELjNj1H722PU';
// const API_KEY9 = 'AIzaSyC8mj-A3_I9TijP-5CPjavsK1jpMMNJaXo';
// const API_KEY10 = 'AIzaSyAXzrZWRupNBW2YaSQRRaqe7cF8dgAXjtc';
// const API_KEY11 = 'AIzaSyADPOl_iivtmpntVB1OxQUpF3RCnX_BTk4';
// const API_KEY12 = 'AIzaSyCVqKI4RQPmM7OmBDlGw9mLyqaOnVhG0i4';
// const API_KEY13 = 'AIzaSyAJUaHWJw93SZ1D_KchfkfklcXkTofW714';
// const API_KEY14 = 'AIzaSyCb7vg14hDr_aCmaxg-oy-gv-D78QSGiFg';

var searchSample = function(searchKeyword,res) {
    searchKeyword = searchKeyword.replace(/ /g, '%20');
    console.log(searchKeyword);
    // var index = searchTopics.indexOf(searchKeyword);
    // console.log(index);
    // searchKeyword = 'bla'
    var data = ArticleSearchResult.find(function(err, data) {
        // console.log(data)

    });

    var data = ArticleSearchResult.find( { topicName: { $in: ['Financial%20Goals', 'Finance%20Planning'] }} , function(err, data) {
        console.log(data);
        // if data  length is not zero, send the data, else send the err msg to front end

    });

    /* var data = ArticleSearchResult.find({'topicName':searchKeyword},function(err,data){
     console.log(data)
     // if data  length is not zero, send the data, else send the err msg to front end
     if(data.length > 0){
     res.json(data);
     } else {
     var err ={
     errMsg: 'No search results found.'
     }
     res.json(err);
     }
     }); */
}
/* dataIndex = new searchIndex({'searchIndex': 1});
 dataIndex.save(); */
var searchsortedTopics = [];
// fetchComponentApi fetch result from url into searchsortedTopics
var fetchComponentApi = function(options,searchQueryData){
    console.log('in fetchComponentApi');
    var http = require('http');
    var searchFinalRes = [];
    var req = http.get( options.host, function(response) {
        var str = '';
        response.on('data', function(d) {
            str += d;
        });
        response.on('end', function() {
            console.log(str);
            var resObj = JSON.parse(str.substr(62).slice(0,-2).replace(/new/gi, '"new').replace(/\)/gi,')"'));
            console.log('resObj');
            console.log(resObj);

            /* searchFinalRes = searchFinalRes.concat(searchSortTopics(resObj,searchQueryData)).sort(function(a, b) {
             return parseFloat(b.v) - parseFloat(a.v);
             }); */
            searchsortedTopics = searchsortedTopics.concat(searchSortTopics(resObj,searchQueryData));
            console.log('search final res = ');
            console.log(searchsortedTopics);
            // return searchsortedTopics;
        });
    }).on('error', function(e) {
        console.error('error',e);
    })
}
// searchSortTopics Sort result object and return array of obj with attribute f,index
// USAGE: fetchComponentApi
var searchSortTopics = function(resObj, searchQueryData){
    var len = resObj.table.rows.length;
    var result = resObj.table.rows[len - 1].c;
    var count = 0;
    queryName = '';
    result.shift();// removes first element
    for(var obj in result) {
        result[obj].f = searchQueryData[count]['name'];
        result[obj].index = searchQueryData[count]['index'];
        count++;
    }

    result.sort(function(a, b) {
        return parseFloat(a.v) - parseFloat(b.v);
    });
    console.log('in search sort topics before result');
    console.log(searchQueryData);
    return(result);

}
// Make Google Api Request for every 6 minutes on 5 till all topics are covered
var searchDataFetchComponent = function(loopVar) {
    console.log('inside search data fetch component');
    var flagLoopVar = 1;
    var mySearchVar  = setInterval(function() {
        if((loopVar - 1) % 30 == 0 && flagLoopVar != 1) {
            console.log('insideeeeeeeeeeeeeeeeeeee clear interval of searchdata fetch component');
            clearInterval(mySearchVar);
            // loopVar = loopVar - 30;
            clearInterval(mySearchVar);
            searchData(loopVar - 30);
        } else{
            console.log('loopVar = ' + loopVar);
            flagLoopVar = 0;
            var query = '';
            var searchQueryData = [];
            for(var i = loopVar; i < (loopVar + 5); i++) { // from 1 to 6
                query += searchTopics[i - 1]['search_topics_' + i];
                query += (i != (loopVar + 4 ) ? ',' : '');

                searchQueryData.push({index: i , name: searchTopics[i - 1]['search_topics_' + i]});
            }
            loopVar = loopVar + 5;
            console.log('query = ' + query);
            console.log(searchQueryData);
            var path1 = '/trends/fetchComponent?hl=en-US&q=' + query + '&cid=TIMESERIES_GRAPH_0&export=3&w=500&h=300';
            var options = {
                host: 'http://www.google.com/trends/fetchComponent?hl=en-US&q=' + query + '&cid=TIMESERIES_GRAPH_0&export=3&w=500&h=300',
                path: '' + path1
            };
            fetchComponentApi(options, searchQueryData);
            console.log('loopVaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaar = ' + loopVar);
        }
    }, 360000); // 6minutes
}

// searchDataFetchComponent(121);

// searchData
var searchData = function(loopVar){
    var index = 0;
    var searchDataArr = [];
    var data;
    var arrIndex = loopVar%30 - 1;
    console.log('inside search data');
    /* var data = searchIndex.find(function(err,data){
     console.log(data[0].searchIndex);
     loopVar = data[0].searchIndex;
     }); */
    console.log(searchsortedTopics);
    var myVar  = setInterval(function() {
        var myData = '', title = '', obj;
        if(loopVar == 151){
            var dataIndex = new searchIndex({'searchIndex': 1});
            dataIndex.save();
            console.log('Completed search data filling');
            // algoTrial();
            clearInterval(myVar);
        } else{
            if((loopVar % 8) == 0) {
                index++;
            }
            console.log('searchObj[index] = ' + searchObj[index]);
            customsearch.cse.list({ cx: CX, q: searchsortedTopics[arrIndex].f, auth: searchObj[index] }, function(err, resp) {
                if(err) {
                    // res.json(err);
                    console.log('An error occured', err);
                    return;
                }
                // res.json(resp);
                console.log('resp = ');
                console.log(resp);
                if(resp && resp.items && resp.items.length > 0) {
                    for(var k = 0; k < resp.items.length; k++) {
                        var result = {
                            title: resp.items[k].title, // .substring(0,30) + '...',
                            iframeLink: resp.items[k].link,
                            date: (resp.items[k].pagemap && resp.items[k].pagemap.metatags && resp.items[k].pagemap.metatags[0]['article:modified_time']) ? resp.items[k].pagemap.metatags[0]['article:modified_time'].substring(0, 10) : '0000-00-00',
                            snippet: resp.items[k].snippet, // .substring(0,125) + '...',
                            imgUrl: (resp.items[k].pagemap ? (resp.items[k].pagemap.cse_image && resp.items[k].pagemap.cse_image[0].src ? resp.items[k].pagemap.cse_image[0].src : (resp.items[k].pagemap.cse_thumbnail && resp.items[k].pagemap.cse_thumbnail[0].src ? resp.items[k].pagemap.cse_thumbnail[0].src: 'images/defaultImg/search_' + loopVar + '/' + Math.ceil(Math.random()*5) + '.png')): 'images/defaultImg/search_' + loopVar + '/' + Math.ceil(Math.random() * 5) + '.png'),
                            displayLink: resp.items[k].displayLink ? resp.items[k].displayLink : '',
                            topicRank: searchsortedTopics[arrIndex].v, // found using fetchcomponent
                            topicName: searchsortedTopics[arrIndex].f,
                            topicArrIndex: searchsortedTopics[arrIndex].index - 1 // index in searcTopics
                        }
                        searchDataArr.push(result);
                    }
                    ArticleSearchResult.find(function(err, data) {
                        myData = data;
                        for(var i = 0; i < searchDataArr.length; i++) {
                            var snippet = searchDataArr[i].snippet;
                            obj = myData.filter(function(obj) {
                                return obj.snippet === snippet;
                            })[0];
                            if(!obj) {
                                // res.json('saving in db');
                                console.log('saving in db');
                                data = new ArticleSearchResult(searchDataArr[i]);
                                data.save();
                            }
                            // res.json('dint saving in db');
                            console.log('---------------------------------------------------------------');
                        }
                        console.log('Done' + searchDataArr.length);
                        searchDataArr = [];
                        // algoTrial();
                    });
                }
                loopVar++;
                arrIndex++;
                if(arrIndex % 30 == 0) {
                    console.log('arrIndex ====================== ' + arrIndex);
                    clearInterval(myVar);
                    mongoose.connection.db.dropCollection('searchIndexVal', function(err, result) {
                        console.log('deleted search index');
                        var dataIndex = new searchIndex({'searchIndex': loopVar});
                        dataIndex.save();
                        // algoTrial();
                    });
                    clearInterval(myVar);
                }
            });
        }
    }, 9000); // 9 seconds delay for synchronization
}

// searchData();
/* dataIndex = new searchIndex({'searchIndex': 1});
 dataIndex.save(); */


//
var artResult = [], count = 0;
//
var finalData = {};
//
var finalD = [];




var queryData = [], queryName = '';
// sameday flag to prevent fake daysinlead update since algo runs thrice a day
var sameday = false;
var pastdate = new Date().getDate();

console.log('Past date: ' + pastdate);
var finalres = [];
// var algoTrialFlag1 = 0;
var algoTrial = function() {
    console.log('inside algo trial');
    var currdate = new Date().getDate();
    console.log('Current date: ' + currdate);
    if(pastdate === currdate) {
        sameday = true;
    } else{
        sameday = false;
    }
    console.log('Is it same day:' + sameday);
    // if(algoTrialFlag1 == 0){
    console.log('inside');
    // algoTrialFlag1 = 1;
    var query = '';
    var options;
    var loopVar = 1;
    var path1, options = {host: '', path: ''};
    var algoTrialFlag = 0;

    // fetchArticlesSearchResults var
    trialFinalD = [];
    finalres = [];
    // var flag = 0;
    // res.json('algooooooooo trialllllllllllllllllllll');
    var myVar  = setInterval(function() {
        if(loopVar >= 161) {
            fs.writeFile('./trends.json', JSON.stringify(finalres), 'utf-8', function(err) {
                if(err) throw err
                console.log('Trends File Done!');
            });
            console.log('----------------');
            console.log(algoTrialFlag);
            console.log('----------------');
            if(algoTrialFlag == 0) {
                algoTrialFlag = 1;
                clearInterval(myVar);
                console.log('finalRes:' + finalres);
                finalres.sort(function(a, b) {
                    return parseFloat(b.v) - parseFloat(a.v);
                });
                var topNine = finalres.splice(0, 9);
                for(var i = 0; i < topNine.length; i++) {
                    topNine[i].f = topNine[i].f.replace(/%20/g, ' ');
                }
                // console.log(topNine);
                fetchArticlesSearchResults(topNine);
                console.log('time out cleared!');

            }
        } else{
            query = '';
            queryData = [];
            for(var i = loopVar; i < (loopVar < 161 ? loopVar + 5: loopVar + 2); i++) {
                // query += fileData[i-1]['search_topics_' + i];
                var searchstr = searchTopics[i-1]['search_topics_' + i];
                console.log(searchstr);
                query += searchstr;
                console.log('query 1 - '+ query)
                query += (i != (loopVar < 161 ? loopVar + 4 : loopVar + 1) ? ',' : '');
                console.log('query 2 - ' + query);

                // queryData.push(fileData[i-1]['search_topics_' + i]);
                queryData.push({index: i, name: searchTopics[i - 1]['search_topics_' + i]});
            }
            loopVar = loopVar + 5;
            console.log('query = ' + query);

            path1 = '/trends/fetchComponent?hl=en-US&q='+query+'&cid=TIMESERIES_GRAPH_0&export=3&w=500&h=300';
            options = {
                host: 'http://trends.google.com/trends/fetchComponent?hl=en-US&q='+query+'&cid=TIMESERIES_GRAPH_0&export=3&w=500&h=300',
                path: ''+path1
            };

            // api_v1(options);
            api_v2(query);
        }
    }, 10000); // 1minutes
    // }
}
// algoTrial();
// VERSION 1
var api_v1 = function(options) {
    console.log('in api function');
    var http = require('http');
    console.log(encodeURI(options.host));
    console.log(encodeURIComponent(options.host));
    var req = http.get( options.host, function(response) {
        var str = '';
        response.on('data', function(d) {
            str += d;
        });
        response.on('end', function() {
            console.log(str);
            // console.log(str.substr(62).slice(0,-2).replace(/new/gi, '"new').replace(/\)/gi,')"').replace(/^[, ]+|[, ]+$|[, ]+/g, ","));
            var resObj = JSON.parse(str.substr(62).slice(0,-2).replace(/new/gi, '"new').replace(/\)/gi,')"').replace(/^[, ]+|[, ]+$|[, ]+/g, ","));
            // res.json(resObj);
            console.log('resObj');
            console.log(resObj);
            finalres = finalres.concat(sortTopics_v1(resObj)).sort(function(a, b) {
                return parseFloat(b.v) - parseFloat(a.v);
            });
            console.log('finl res');
            console.log(finalres);
        });
    }).on('error', function(e) {
        console.error('error', e);
    })
};

var sortTopics_v1 = function(resObj) {
    var len = resObj.table.rows.length;
    var result = resObj.table.rows[len - 1].c;
    console.log('result');
    console.log(result);
    if(result.length < 5) {
        console.log('iffffffffffffffffffffff');
        result = resObj.table.rows[len - 2].c;
        console.log(result);
    } else{
        console.log('elseeeeeeeeeeeeeeeee');
    }
    var count = 0;
    queryName = '';
    result.shift();// removes first element
    console.log('inside sort topics ---- result');
    console.log(result);
    for(var obj in result){
        console.log(obj);
        result[obj].f = queryData[count]['name']; // topic name
        result[obj].index = queryData[count]['index']; // index of the topic in the main array that is hardcoded
        // result[obj].v = queryData[count]['index'];
        // console.log(result[obj].v);
        count++;
    }

    result.sort(function(a, b) {
        return parseFloat(a.v) - parseFloat(b.v);
    });
    console.log('result = ');
    console.log(result);
    return(result);

};

// VERSION 2
var api_v2 = function(query) {
    // convert query into keyword array
    var keyword_arr = [];
    console.log(query);
    keyword_arr = query.split(',');
    for(var i in keyword_arr)
    {
        console.log(keyword_arr[i]);
        keyword_arr[i] = keyword_arr[i].replace(/%20/g, ' ');
        console.log(keyword_arr[i]);
    }
    console.log(keyword_arr);
    googleTrends.interestOverTime({keyword: keyword_arr, startTime: new Date(Date.now() - (24 * 60 * 60 * 1000)) })
    .then((resObj) => {
        console.log('this is res', resObj);

        finalres = finalres.concat(sortTopics_v2(JSON.parse(resObj))).sort(function(a, b) {
            return parseFloat(b.v) - parseFloat(a.v);
        });
        console.log(finalres);
    }).catch((err) => {
            console.log('got the error', err);
    });
}

var sortTopics_v2 = function(resObj) {
    console.log('sort_topic v2');
    console.log(resObj);
    var len = resObj.default.averages.length;
    // console.log(len);
    var res = resObj.default.averages;
    console.log(res);
    var result = [];
    count = 0;
    var obj = {};
    for(var i in res) {
        console.log(i);
        result.push({f: queryData[count]['name'], index: queryData[count]['index'], v: res[i]});
        count++;
    }
    console.log('before sort');
    result.sort(function(a, b) {
        return parseFloat(a.v) - parseFloat(b.v);
    });
    console.log('result = ');
    console.log(result);
    return(result);
}


var x = '';
var getGlobalRank = function(intrres, i) {
    console.log(intrres);
    // var res = intrres[intrres.length-2] + '.' + intrres[intrres.length-1];

    // TODO: USE ranking restriction to avoid ads oriented website
    alexaData.AlexaWebData(intrres, function(error, result) {
        trialFinalD[i].globalRank = result.globalRank;
        console.log('res:::' + intrres + ' global ranking:::' + trialFinalD[i].globalRank);
    })
}
// getGlobalRank();
var getGlbrank = function() {
    ArticleFakeResult.find(function(err, data) {
        var res;
        if(data[0].displayLink.substr(0, 4) == 'www.') {
            res = data[0].displayLink.substr(4);
        }
        var url = 'http://www.alexa.com/siteinfo/' + res;
        var http = require('http');
        var req = http.get(url, function(response) {
            var str = '';
            response.on('data', function(d) {
                str += d;
            });
            response.on('end', function() {
                // console.log(str);
                // var n = str.search('GlobalRank\':');
                var n = str.search('Alexa web traffic metrics are available via our API at http://aws.amazon.com/awis');
                console.log(n);
                var z = str.substr(n + 86, 3).replace(/\s/g, '');
                // x = z.substr(0,z.indexOf(","));
                console.log('trialFinalD[i].globalRank = ' + z + ' length=' + z.length);
                // var resp = new ArticleFakeResult(trialFinalD[i]);
                // resp.save();
                // return x;
            });
        }).on('error', function(e) {
            console.log(e);
        });
    });
};

// getGlbrank();
var setD = function(){
    console.log('trailFinalD length:' + trialFinalD.length);
    /* trialFinalD.sort(function(a,b){
     return new Date(b.date) - new Date(a.date);
     }); */
    var i = -1;
    /* for(var i=0;i<trialFinalD.length;i++){
     res = new ArticleFakeResult(trialFinalD[i]);
     res.save();
     } */
    var myVar1 = setInterval(function() {

        if(i < trialFinalD.length - 1) {
            i++;
            console.log('value of i = ' + i);
            console.log(trialFinalD[i].displayLink);
            getGlobalRank(trialFinalD[i].displayLink,i);
        } else{
            clearInterval(myVar1);
            calculateRank();
            // response.json(trialFinalD);
            fs.writeFile('./draftedresult.json', JSON.stringify(trialFinalD), 'utf-8', function(err) {
                if(err) throw err
                console.log('draftedresult File Done!')
            })

        }
    }, 9000);
}

var calculateRank = function() {
    console.log('inside calculateRank');
    // ArticleFakeResult.find(function(err,data){
    // trialFinalD = data;
    // emptyDB();
    var alpha = 10000, beta = 1000, gamma = 5000, omega = 2000;
    var str, res, val, rank, resp;
    var date1, date2, timeDiff, diffDays;
    console.log('printing ranks ----------- final value');
    for(var i = 0; i < trialFinalD.length; i++) {
        str = trialFinalD[i].date.split('-');
        res = str[0] + str[1] + str[2];
        date2 = new Date((new Date().getFullYear()) + '-' + ('0' + (new Date().getMonth() + 1)).slice(-2) + '-' + ('0' + new Date().getDate()).slice(-2)); // current date
        if(trialFinalD[i].date != '0000-00-00') {
            console.log('if ============= ');
            date1 = new Date(trialFinalD[i].date);
            console.log(date1);

            console.log(date2);
            timeDiff = Math.abs(date2.getTime() - date1.getTime());
            console.log(timeDiff);
            diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            console.log(diffDays);
        } else{
            diffDays = 10;
            trialFinalD[i].date = (new Date().getFullYear())+'-'+('0' + (new Date().getMonth() + 1)).slice(-2)+'-'+ ('0' + new Date().getDate()).slice(-2);
            console.log('else ============= ')
        }
        trialFinalD[i].globalRank = trialFinalD[i].globalRank.toString().replace(/,/g, '');
        console.log(diffDays);
        console.log(trialFinalD[i].topicRank + ' ' + Math.log(1 + trialFinalD[i].topicRank) + ' ' + alpha * Math.log(1 + trialFinalD[i].topicRank));
        console.log(trialFinalD[i].globalRank + ' ' + Math.log(1 + trialFinalD[i].globalRank.replace(/,/g, '')) + ' ' + beta * Math.log(1 + trialFinalD[i].globalRank.replace(/,/g, '')));
        console.log(gamma * Math.log(1 + diffDays));


        rank = (alpha * Math.log(1 + trialFinalD[i].topicRank)) - (beta * Math.log(1 + trialFinalD[i].globalRank.replace(/,/g, ''))) - (gamma * Math.log(1 + diffDays)) ;// - (omega * Math.log(1 + 1 + trialFinalD[i].topicRank) * daysInLead);


        trialFinalD[i].rank = rank;
        console.log(rank)
    }

    trialFinalD.sort(function(a, b) {
        return b.rank - a.rank;
    });
    // (trialFinalD.length > 0 ? emptyDB() : '');
    // console.log('DATABASE EMPTIEDDDDDDDDDDDDDDDDDDDD');


    ArticleFeaturedResult.find(function(err, data) {
        var myData = data;
        if(data.length > 0) {
            console.log('inside if line 905 ' + trialFinalD.length);
            for(var i = 0; i < trialFinalD.length; i++) {
                var snippet = trialFinalD[i].snippet;
                var obj = myData.filter(function(obj) {
                    return obj.snippet === snippet;
                })[0];
                console.log('snippet == ' + snippet);
                if(!obj) {
                    console.log('saving article in db');
                    console.log('-------------------------------------------');
                    trialFinalD[i].daysInLead = 1;
                    trialFinalD[i].rank -= (omega * Math.log(1 + 1 + trialFinalD[i].topicRank) * trialFinalD[i].daysInLead);
                    data = new ArticleFeaturedResult(trialFinalD[i]);
                    data.save();
                } else{
                    console.log(obj.date);
                    console.log(obj.daysInLead);
                    console.log(trialFinalD[i].date);
                    if(!sameday) {
                        if(obj.daysInLead >= 35) {
                            trialFinalD[i].daysInLead = 1;
                        } else {
                            trialFinalD[i].daysInLead = obj.daysInLead + 1;
                        }
                    }
                    // here update the values of the articles already in the DB
                    // trialFinalD[i].date = obj.date;
                    trialFinalD[i].rank -= (omega * Math.log(1 + 1 + trialFinalD[i].topicRank) * trialFinalD[i].daysInLead);
                    console.log(trialFinalD[i].rank);
                    console.log(trialFinalD[i].daysInLead);
                    console.log(trialFinalD[i].date);
                    ArticleFeaturedResult.update({snippet: snippet}, {
                        $set: {daysInLead: trialFinalD[i].daysInLead, rank: trialFinalD[i].rank}
                    }, function(err, numberAffected, rawResponse) {
                        // handle it
                        console.log('duplicate data updated in db');
                    });
                    console.log('-------------------------------------------');
                }
                console.log('------ end of for single cyscle ------------');
            }
            console.log('Done' + trialFinalD.length);
            // trialFinalD = [];
        } else{
            for(i = 0; i < trialFinalD.length; i++) {
                trialFinalD[i].daysInLead = 1;
                trialFinalD[i].rank -= (omega * Math.log(1 + 1 + trialFinalD[i].topicRank) * trialFinalD[i].daysInLead);
                resp = new ArticleFeaturedResult(trialFinalD[i]);
                resp.save();
            }
        }
        var timetakenalgo = new Date(Date.now() - AlgoStartTime);
        console.log('Time Taken for Algo ::' + timetakenalgo.getHours() + ' H ' + timetakenalgo.getMinutes() + ' M ' + timetakenalgo.getSeconds() + ' S ');
    });
}
// calculateRank();

var trialFinalD = [];
var flag = 0;
var fetchArticlesSearchResults = function(topNine) {
    if(flag == 0){
        var searchTopics = [];
        // flag=1;
        console.log('printing the values of v.........................');
        for(var i = 0; i < topNine.length; i++) {
            console.log('fetchArticlesSearchResults: ' + topNine[i].f);
            searchTopics[i] = topNine[i].f.replace('%20', ' ');
            console.log(topNine[i].v);
        }
        finalData = [];
        console.log('immmmmmmm insideeeeeeeeeeeeeeeeeeee');
        var queryIndex, query = '';
        var result = {
            title: '',
            iframeLink: '',
            date: '',
            snippet: '',
            imgUrl: '',
            displayLink: '',
            rank: '',
            globalRank: '',
            index: '',
            indexTopic: '', // name of the topic article
            topicRank: ''
        };
        // (arr.length > 0 ? emptyDB() : '');
        var customjson = [];
        var i = 0;
        var k = -1;
        var myVar = setInterval(function() {
            if(i < searchTopics.length) {
                query = searchTopics[i];
                console.log(query);
                // orTerms: 'Finance'
                // dateRestrict - Restricts results to URLs based on date
                // hq - Appends the specified query terms to the query, as if they were combined with a logical AND operator.
                // safe - Search safety level
                // ,hq: 'Finance',safe: 'high'
                customsearch.cse.list({ cx: CX, q: query, auth: API_KEY ,dateRestrict: 'd1', hq: 'Finance', safe: 'high'}, function(err, resp) {
                    // res.json(resp);
                    finalData.push(resp);
                    if(err) {
                        console.log('An error occured', err);
                        return;
                    }
                    console.log('custom search');
                    console.log(resp);
                    customjson.push(resp);
                    for(var k = 0;k < resp.items.length; k++) {
                        result = {
                            title: resp.items[k].title, // .substring(0,30) + '...',
                            iframeLink: resp.items[k].link,
                            date: (resp.items[k].pagemap && resp.items[k].pagemap.metatags && resp.items[k].pagemap.metatags[0]['article:modified_time']) ? resp.items[k].pagemap.metatags[0]['article:modified_time'].substring(0, 10) : (resp.items[k].pagemap && resp.items[k].pagemap.metatags && resp.items[k].pagemap.metatags[0]['date']) ? resp.items[k].pagemap.metatags[0]['date'] :'0000-00-00',
                            snippet: resp.items[k].snippet, // .substring(0,125) + '...',
                            imgUrl: (resp.items[k].pagemap ? (resp.items[k].pagemap.cse_image && resp.items[k].pagemap.cse_image[0].src ? resp.items[k].pagemap.cse_image[0].src : (resp.items[k].pagemap.cse_thumbnail && resp.items[k].pagemap.cse_thumbnail[0].src ? resp.items[k].pagemap.cse_thumbnail[0].src : 'images/defaultImg/search_' + topNine[i].index + '/' + Math.ceil(Math.random()*5) + '.png')) : 'images/defaultImg/search_' + topNine[i].index + '/' + Math.ceil(Math.random()*5) + '.png'),
                            displayLink: resp.items[k].displayLink ? resp.items[k].displayLink : '',
                            rank: '0',
                            globalRank: '0', // domain rank
                            index: topNine[i].index, // index in original array hard coded article topic
                            indexTopic: searchTopics[i], // name of the topic article
                            topicRank: topNine[i].v
                        }
                        trialFinalD.push(result);
                    }
                    i++;
                });
            }else{
                fs.writeFile('./customsearch.json', JSON.stringify(customjson), 'utf-8', function(err) {
                    if(err) throw err;
                    console.log('customsearch File Done!');
                })

                clearInterval(myVar);
                // res.json(finalData);
                setD();
            }
        }, 9000);
    }
}
// Possible date attributes
// article:modified
// article:published
// dc.date.issued
// dat
// displaydate
// pdate
// ptime
// utime
// parsely-pub-date
// sailthru.date
// validatedat
// fetchArticlesSearchResults();

var setData = function() {
    var res;
    for(var i = 0; i < 9; i++) {
        res = new ArticleResult(artResult[i]);
        res.save();
    }
}
var setLoadMore = function() {
    var result = {
        title: '',
        iframeLink: '',
        snippet: '',
        imgUrl: ''
    }, loadMoreRes = [], res, count = 1;
    for(var k = 0; k < 9; k++) {
        for(var j = 0; j < 9; j++) {
            console.log('j=' + j);
            result = {
                title: finalD[j].items[count].title, // .substring(0,30) + '...',
                iframeLink: finalD[j].items[count].link,
                snippet: finalD[j].items[count].snippet, // .substring(0,125) + '...',
                imgUrl: (finalD[j].items[count].pagemap ? (finalD[j].items[count].pagemap.cse_image && finalD[j].items[count].pagemap.cse_image[0].src ? finalD[j].items[count].pagemap.cse_image[0].src : (finalD[j].items[count].pagemap.cse_thumbnail && finalD[j].items[count].pagemap.cse_thumbnail[0].src ? finalD[j].items[count].pagemap.cse_thumbnail[0].src : 'images/default.jpg')) : 'images/default.jpg')
            }
            loadMoreRes.push(result);
        }
        count++;
    }

    for(var i = 0; i < loadMoreRes.length; i++) {
        res = new ArticleResult(loadMoreRes[i]);
        res.save();
    }
}
//  algo end

// error handling
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something bad happened!');
});

initDb(function(err) {
    console.log('Error connecting to Mongo. Message:\n' + err);
});

// console.log('start Algo on restart');
// AlgoStartTime = Date.now();
// algoTrial();

app.listen(port, ip);
// require('node-monkey').start({host: ip, port:3003});
console.log('Server running on http://%s:%s', ip, port);

module.exports = app;
