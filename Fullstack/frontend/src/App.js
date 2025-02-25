import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';
import axios from "axios";

// function App() {
	
// 	const handleClick = async ()=>{
// 		try{
// 			const response= await axios.get("/hello")
// 			alert(response.data.message)
			
// 	}catch(error){
// 		alert("something went wrong {error}")
// 	}	
// 	}
	
//   return (
//     <div className="App">
//       <h1>Click on the button for greetings</h1>
// 	  <button onClick={handleClick}>Click me</button>
//     </div>
//   );
// }

const App = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState('');
  const [pathParams, setPathParams] = useState('');
  const [requestBody, setRequestBody] = useState('');
  const [requestDisplay, setRequestDisplay] = useState('');
  const [response, setResponse] = useState('');

  const endpoints = [
    { value: '/city/addcity', method: 'POST' },
    { value: '/city/getcity', method: 'GET' },
    { value: '/city/getcitybyname/:city_name', method: 'GET' },
    { value: '/city/updatecitybyname/:city_name', method: 'PUT' },
    { value: '/city/deletebyname/:city_name', method: 'DELETE' },
  ];

  const handleSubmit = async () => {
    const finalUrl = selectedEndpoint.replace(':city_name', pathParams);
    const requestConfig = {
      method: getMethod(selectedEndpoint),
      url: finalUrl,
      data: requestBody ? JSON.parse(requestBody) : {},
    };

    try {
      setResponse('Loading...');
      const res = await axios(requestConfig);
      setResponse(JSON.stringify(res.data, null, 2));
    } catch (error) {
      setResponse('Error: ' + error.message);
    }
  };

  const getMethod = (endpoint) => {
    const endpointConfig = endpoints.find(e => e.value === endpoint);
    return endpointConfig ? endpointConfig.method : 'GET';
  };

  return (
    <div>
      <h1>API Request Tester</h1>

      <div>
        <label>Endpoint:</label>
        <select
          value={selectedEndpoint}
          onChange={(e) => {
            setSelectedEndpoint(e.target.value);
            setRequestBody('');
            setPathParams('');
            setRequestDisplay('');
            setResponse('');
          }}
        >
          <option value="">Select an endpoint</option>
          {endpoints.map((endpoint) => (
            <option key={endpoint.value} value={endpoint.value}>
              {endpoint.value} ({endpoint.method})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Path Parameters:</label>
        <input
          type="text"
          value={pathParams}
          onChange={(e) => setPathParams(e.target.value)}
          placeholder="Enter path parameters if needed"
        />
      </div>

      <div>
        <label>Request Body:</label>
        <textarea
          value={requestBody}
          onChange={(e) => setRequestBody(e.target.value)}
          placeholder="Enter request body as JSON"
        />
      </div>

      <div>
        <label>Request Preview:</label>
        <pre>{requestDisplay || 'No request selected'}</pre>
      </div>

      <button onClick={handleSubmit}>Submit</button>

      <div>
        <h2>Response:</h2>
        <pre>{response}</pre>
      </div>
    </div>
  );
};



export default App;