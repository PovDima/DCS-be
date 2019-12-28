DCP BE test 

1. For storage data I use file metric.js
2. For make request on server use api/v1/metric
3. For GET request use api/v1/metric/:key/sum
4. For POST request use api/v1/metric/:key and pass this object {"value" : any number } on body
5. GET request work only for last hour data
6. For GET reuest if server don't have data, then server return { value: 0 }
7. I do not know how to delete data from a file that is older than 1 hour. 
8. I will be grateful if you send me letter on email povdima19@gmail.com how to do this, because I could not find an answer on the Internet
