# futwork-assignment

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

To create the api endpoint, firstly I created a basic server.  

After this my solution is mainly divided in 3 parts:  

1) To create a function which converts csv data into array of objects.  
   - I created a function called "convertCsvToArray" which takes the csv data as input then it will first slice the header and split it according to delimeter.  
   - Then it will slice the rows one by one and again split them based on '\n'.  
   - Atlast using map method, each row in the rows will be split according to the delimeter to get particular values for its corresponding header and then by using reduce method on header, it will return an array of objects where key is header elements and value is the corresponding values which we got previously.
   
   This is the function ->   
     ``` javascript
    const convertCSVToArray = (data, delimiter = ',') => {  
    const header = data.slice(0, data.indexOf('\n')).toString().split(delimiter);  
    const rows = data.slice(data.indexOf('\n') + 1).toString().split('\n');  
    return rows.map(row => {  
        const values = row.split(delimiter);  
        return header.reduce((object, curr, i) => (object[curr] = values[i], object), {})  
    });  
};  
```
