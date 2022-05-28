import fetch from 'node-fetch';

const response = await fetch('http://localhost:4000/posts', {
    method:'GET',
    headers: {'content-type':'application/json'}
});

const json_response = await response.json();

console.log(json_response);