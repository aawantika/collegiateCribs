app.use(express.bodyParser());

app.post('/', function(request,response){
	console.log(request.body.username);
	console.log(request.body.password);
})