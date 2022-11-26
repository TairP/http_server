import log from '@ajar/marker'; 
import http, { Agent } from 'http';
import urlHelper from 'url';
// import { url } from 'inspector';
// import querystring from 'querystring';

// const PORT = process.env.PORT;
// const HOST = process.env.HOST;
const { PORT, HOST } = process.env;
console.log(process.env);

//create an http web server
const server = http.createServer( (req,res)=> {
    const {url, method, httpVersion, headers} = req
    // let filename = url.split('/').pop().slice(7)
    res.statusCode = 200;
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
        pathname: urlHelper.parse(url,true).pathname,
        querystring: urlHelper.parse(urlHelper.parse(url,true).search,true).query,
        // queryString: querystring.parse(filename),
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
