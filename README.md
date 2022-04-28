# [Futwork-Assignment](https://gist.github.com/yashbeer/d10b18ba8c5dd405769d1abe0c0cec22)

This is my solution to the given assignment.

## Problem statement:

Data is given in form of csv file but it contains some duplicate numbers. 
So I have to create an api end-point which gives a response in JSON in which I have to seperate the duplicate numbers from others.

#### Given Data in CSV:

mobile,name,city  
8080123456,Yashbeer,Germany  
9812345678,Armaan,Tokyo  
8080123456,Nisha,Berlin  
7201123123,Prasad,Dubai  
7201123123,Pankaj,Amsterdam  

### Expected response in JSON:
  
{   
	"processed": [  
		{  
			"mobile": "8080123456",  
			"name": "Yashbeer",  
			"city": "Germany"  
		},  
		{  
			"mobile": "9812345678",  
			"name": "Armaan",  
			"city": "Tokyo"  
		},  
		{  
			"mobile": "7201123123",  
			"name": "Prasad",  
			"city": "Dubai"  
		}  
	],  
	"unprocessed": [  
		{  
			"mobile": "8080123456",  
			"name": "Nisha",  
			"city": "Berlin"  
		},  
		{  
			"mobile": "7201123123",  
			"name": "Pankaj",  
			"city": "Amsterdam"  
		}  
	]  
}  

### Response of My Solution:
###### on browser
![json response](https://user-images.githubusercontent.com/54750457/165836457-6b2f4e63-30e9-41eb-b0e1-f2183eb87cac.png)

###### on postman(Body & header)

![postman-response](https://user-images.githubusercontent.com/54750457/165837756-f4438ba8-c356-4f9a-a7d8-0a8c04fc37e7.png)

![postman-header](https://user-images.githubusercontent.com/54750457/165837827-c5cd2616-6d5a-4fac-ac29-ddf8b265ae9c.png)


### My solution

To create the api endpoint, firstly I created a server which will listen to the client requests.  

After this my solution is mainly divided in 3 parts:  

1) To create a function which converts csv data into array of objects.  
   - I created a function called "convertCsvToArray" which takes the csv data as input then it will first slice the header and split it according to delimeter.  
   - Then it will slice the rows one by one and again split them based on '\n'.  
   - Atlast using map method, each row in the rows will be split according to the delimeter to get particular values for its corresponding header and then by using reduce method on header, it will return an array of objects where key is header elements and value is the corresponding values which we got previously.
   
   This is the function ->   
   
    const convertCSVToArray = (data, delimiter = ',') => {  
    const header = data.slice(0, data.indexOf('\n')).toString().split(delimiter);  
    const rows = data.slice(data.indexOf('\n') + 1).toString().split('\n');  
    return rows.map(row => {  
        const values = row.split(delimiter);  
        return header.reduce((object, curr, i) => (object[curr] = values[i], object), {})  
    });  
};  
      

2) Now an array of object(csvArray) is obtained and to seperate its data where the mobile numbers are duplicate, I have applied a logic in a following way:
	- Firstly, Create a hashmap to kepp track of the mobile numbers which are repeating. I choosed hashmap because search in hashmap requires O(1) time complexity so it is very efficient.
	- Now create forEach loop to loop through each element in the csvArray and then each time check whether the mobile number is present in the hashmap or not. If its present then store the particular object in array named 'duplicate' and if its not present then store the object in array named 'unique' and then update the hashmap with mobile number of current object.
	- Now 2 arrays are obtained unique and duplicate so now create a result object where the value for key processed, value will be the array 'unique' and for key unprocessed the value will be array 'duplicate'.
	
	- Now the result is obtained in form of object So now export this object so that it can be used by server to send this data to the client by using module.exports.  
    This is the logic ->        

  let unique = []  
  let duplicate = []   
  let duplicateMobileNumbers = new Map();  

  csvArray.forEach((obj) => {  
      if(duplicateMobileNumbers.has(obj.mobile)) {  
          duplicate.push(obj)  
      }  
      else {  
          duplicateMobileNumbers.set(obj.mobile, 1);  
          unique.push(obj)  
      }  
  })  
  
  const result = {  
      processed : unique,  
      unprocessed : duplicate  
  }  
  
  
  module.exports = {  
      result  
  }  


3) In the server create an endpoint '/customer-data' which will be a GET request. Inside this request first, for the header give the content-type as 'application/json' using res.writeHead() method. Then convert the 'result' object into json by first importing it from the source file and then converting it using JSON.Stringify().  
  
The code ->  
  
app.get('/customer-data', (req, res) => {  
    res.setHeader('Content-Type', 'application/json');  
    res.end(JSON.stringify(customer_data.result, null, 4));  
})  
  
### Extras
1) I have used camel case naming conventions wherever possible and named the variable and functions meaningfully.
2) I have kept the folder structure organized.

#### Thank You for giving me this opportunity
![f9dd3039ca06a501c63863d2be445a29](https://user-images.githubusercontent.com/54750457/165849058-708bd16d-2eb0-4bfe-96f8-0dc6bc79b087.gif)
