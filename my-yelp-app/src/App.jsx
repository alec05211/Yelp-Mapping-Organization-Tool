import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SearchBar from './components/SearchBar.jsx'

function App() {
  const [count, setCount] = useState(0)

  const handleSearch = (query) => {
    alert(`You searched for: ${query}`)
    // You can replace this with your actual search logic
  }

  return (
    <>
      <SearchBar onSearch={handleSearch} />
    </>
  )
}

export default App
