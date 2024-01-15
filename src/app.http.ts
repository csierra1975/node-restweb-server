import  fs from 'fs'
import http from 'http'

const server = http.createServer((req, res) => {

    console.log(req.url)

    // res.writeHead(200, {'Content-Type': 'text/html'})
    // res.write(`<h1>Hola Mundo</h1>`)
    // res.end()

    // const data = { name: 'John Doe', age: 30, city: 'New York'}
    // res.writeHead(200, {'Content-Type': 'text/html'})
    // res.end(JSON.stringify(data))

    
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

    const content = fs.readFileSync(`.${req.url}`, 'utf-8')
    res.end(content)
})

server.listen(8080, () => {
    console.log('Server running on port 8080')
})