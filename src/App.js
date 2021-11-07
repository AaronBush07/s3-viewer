import "./App.css";
import { useState, useEffect } from "react";
//import S3Viewer from "./components/S3Viewer";

import axios from "axios";

/**Return array based on xml content */
function xmlParse(data) {
  console.log(data)
  
}

function App() {
  const [s3List, sets3List] = useState();
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios("https://seven-s3-bucket.s3.ap-southeast-2.amazonaws.com/")
      .then((response) => {
        sets3List(xmlParse(response.data));
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
    </div>
  );
}

export default App;
