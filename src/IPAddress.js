import React from 'react'
import Fetch from 'smalldots/lib/Fetch';

const IPAddressWidget = () => (
  <Fetch url="https://api.ipify.org?format=json" lazy={true}>
    {({ fetching, data, error, fetch }) => {
      if (fetching) {
        return <span>loading...</span>
      }
      if (data) {
        return <p className="text-success">Your IP Address is {data.ip}</p>
      }
      if (error) {
        return <p className="text-danger">Something bad happened</p>
      }
      return (
        <button className="btn btn-link" type="button" onClick={() => fetch()}>
          What is my IP Address?
        </button>
      )
    }}
  </Fetch>
)

export default IPAddressWidget
