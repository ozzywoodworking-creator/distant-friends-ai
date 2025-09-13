import React from 'react'

function App() {
  return (
    <div>
      <h1>Distant Friends AI Dashboard</h1>
      <p>Connected to backend: {process.env.REACT_APP_API_URL}</p>
    </div>
  )
}

export default App