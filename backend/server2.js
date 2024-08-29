const studentApi = [
    {
        "id":"1",
        "name":"hassan"
    }
];

const http=require('http');
const host='127.0.0.1';
const server = http.createServer((req, res) =>{
    if (req.url === "/") {
      res.writeHead(200, 
        {
          "Content-Type": "application/json",
        //   "Access-Control-Allow-Origin": "*",
        //   "Access-Control-Allow-Headers": 'Origin, X-Requested-With, Content-Type, Accept'
        }
      );
      res.end(JSON.stringify(studentApi));
    }
  });
  // const port = 8081;
  const port = 8083;
  server.listen(port, () => console.log(`Server running at http://${host}:${port}`));
  
  