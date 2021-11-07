import React from "react";

import JSONViewer from 'react-json-viewer'

export function S3Viewer(props) {
  return <div>
    <JSONViewer json={props.json}/>
  </div>
}