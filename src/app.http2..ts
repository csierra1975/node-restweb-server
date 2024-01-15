import  fs from 'fs'
import http2 from 'http2'

const server = http2.createSecureServer( {
    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt'),
}, (req, res) => {

    console.log(req.url)
    
    if (req.url==='/')
    {
        const hmtlFile = fs.readFileSync('./public/index.html', 'utf-8')

        res.writeHead(200, {'Content-Type': 'text/html'})
        res.end(hmtlFile)
        return
    }

    if (req.url?.endsWith('.js'))
    {
        res.writeHead(200, {'Content-Type': 'application/javascript'})
    } else if (req.url?.endsWith('.css')){
        res.writeHead(200, {'Content-Type': 'text/css'})
    }

    try {
        const content = fs.readFileSync(`.${req.url}`, 'utf-8')
        res.end(content)
    }catch(error){
        res.writeHead(404, {'Content-Type': 'text/html'})
        res.end()
    }
})

server.listen(8080, () => {
    console.log('Server running on port 8080')
})