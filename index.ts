//import * as json2xml from 'json2xml';
import * as js2xmlparser from 'js2xmlparser';
import * as diet from 'diet';
import * as util from 'util';


var rssFeed = {
    channel: {
        title: "Download buffer",
        link: "http://localhost:8000",
        description: "download buffer",
        item: [{
            title: "Example",
            description: "http://google.com",
            link: "http://google.com",
            pubDate: Date.now(),
            enclosure: {
                "@": {
                    url: "http://google.com"
                }
            }
        }]
    },
    "@": {
        "xmlns:atom": "http://www.w3.org/2005/Atom",
        version: "2.0"
    }
};

var app = diet();
app.listen('http://localhost:8000')

const replHTML = function ($) {
    $.header('Content-Type', 'html');
    $.end('<html><body><form action="/add" method="POST"><input type="text" name="url" /><input type="submit" text="Add" /></form></body></html>')
}

// When http://localhost:8000/ is requested, respond with "Hello World!"
app.get('/', function ($) {
    replHTML($);
});

app.post('/add', function ($) {
    rssFeed.channel.item.push({
        title: $.body.url,
        description: 'added via web',
        link: $.body.url,
        pubDate: Date.now(),
        enclosure: {
            "@": {
                url: $.body.url
            }

        }
    });
    replHTML($);
});

app.get('/rss', function ($) {
    $.header('Content-Type', 'application/rss+xml');
    $.end(js2xmlparser.parse('rss', rssFeed));
});