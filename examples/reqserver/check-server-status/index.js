const express = require('express');
const request = require('request');
// const request = require('request-promise-native');
const app = express() 

app.use(express.json());
app.use(express.urlencoded({extended:true}));


const reqAction = (config,callback)=>{
	return new Promise(resolve=>{
		const {url} = config
		var options = {
			url,
			headers: {
				'User-Agent': 'request'
			}
		};
		
		request(options, (error, response, body) => {
			const status = !error && response.statusCode == 200
			resolve({url,status})
		});
	})
} 

app.post('/websites/status',(req,res)=>{
	console.log('TCL: mainServ -> req', req.body);

	const multiRequest = req.body.urls.map(url=>{
		return reqAction({url})
	})
	
	Promise.all(multiRequest).then((values)=>{
		console.log('TCL: values', values);
		res.json({success:true,results:values});

	}).catch(error=>{
		res.json({success:false,message:error.message});
	})

})

let port = 3000;
app.listen(port, ()=>{
	console.log(`app listening on port ${port}`);
});