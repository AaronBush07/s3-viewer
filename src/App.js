import "./App.css";
import { useState, useEffect } from "react";

import axios from "axios";
import { S3Viewer } from "./components/S3Viewer";

const baseURL = 'https://seven-s3-bucket.s3.ap-southeast-2.amazonaws.com/'

/**Return array based on xml content */
function xmlParse(data) {
  console.log(data);
  if (data) { 
  const parser = new DOMParser()
  const xml = parser.parseFromString(data, 'text/xml');
    const contents = xml.getElementsByTagName('Contents')[0];
    return Array(contents.getElementsByTagName('Key')).map(element=>{
      return element[0].textContent
    })
  }
  return []
}




function App() {
  const [s3List, sets3List] = useState();
  const [loading, setLoading] = useState(null);
  const [jsonFile, setjsonFile] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios(baseURL)
      .then((response) => {
        const list = xmlParse(response.data)
        sets3List(list.map(element=>{
          return <p key={element} onClick={e=>setjsonFile(String(baseURL+element))}>{element}</p>;
        }));
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      })
      .finally(() => setLoading(false));
  }, []);

  

  return (
    <div className="App">
      <h2 align="center">Event Viewer</h2>
      <div>
      {loading === true ? 'Loading...': ''}            
      {s3List}
      </div>
      <div>
        <S3Viewer json={jsonFile}/>
      </div>

    </div>
  );
}

export default App;
