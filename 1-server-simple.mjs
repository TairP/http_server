import log from '@ajar/marker'; 
import http, { Agent } from 'http';
import { url } from 'inspector';
import querystring from 'querystring';

// const PORT = process.env.PORT;
// const HOST = process.env.HOST;
const { PORT, HOST } = process.env;
//console.log(process.env);

//create an http web server
const server = http.createServer( (req,res)=> {
    const {url, method, httpVersion, headers, pathname} = req
    let filename = url.split('/').pop().slice(7)
    res.statusCode = 200;
    // res.setHeader('Content-Type','text/plain')
    // res.setHeader('Content-Type','text/html')
    // res.end(`<h1>Hello from server!!!</h1>`)
    res.setHeader('Status-Code', res.statusCode)
    res.setHeader('User-Agent', 'headers')
    res.setHeader('agenda', 'political')
    res.setHeader('anything', 'goes')
    res.setHeader('Content-Type','application/json')
    res.setHeader('some-single-header', 'some-single-value')
    // let obj = {x:22,nested:{name:'tomer'},z:33}
    let obj = {
        href: `http://${HOST}:${PORT}${url}`,
        url,
        method,
        host: `${HOST}:${PORT}`,
        protocol: "http:",
        httpVersion: httpVersion,
        pathname,
        queryString: querystring.parse(filename),
        // querystring: querystring.parse(url),
        userAgent: headers['user-agent'],
        connection: headers.connection
    }
    res.end(JSON.stringify(obj));
});

//have the server listen to a given port
server.listen(PORT,HOST, err => {
    if(err) log.error(err);
    else log.magenta(`🌎  listening on`,`http://${HOST}:${PORT}`);
});
