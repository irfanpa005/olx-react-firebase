import React from 'react'
import { FallingLines } from 'react-loader-spinner';

function Loader() {
  return (
    <FallingLines
        color="#4fa94d"
        width="100"
        visible={true}
        ariaLabel="falling-circles-loading"
    />
  )
}

export default Loader
