import axios from "axios";
import React, { useEffect, useState } from "react";

import JSONViewer from 'react-json-viewer'

export function S3Viewer(props) {

  const [json, setJson] = useState(props.json);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    console.log('trigger useEffect')
    if (props?.json) {
      console.log('loading the json')
      setLoading(true)
      console.log(props);
      axios(props.json).then(
        response=>{
          setJson(response.data);
        }
      ).catch(err=>{
        console.log("Error loading Json file")
        setLoading(false);
      }).finally(()=>setLoading(false))
    }
  }, [props.json])

  
  return <div>
    {loading ? <p>Loading...</p> : json ? <JSONViewer json={json}/> : <p>Click an element</p>}
  </div>
}