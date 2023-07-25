import { useState } from 'react'
import {
  Button,
  Box,
  Typography,
  TextField,
  CircularProgress
} from '@mui/material'
import HtmlModal from './HtmlModal'

const WebScraper = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false) // Initialize isLoading with false

  const handleSearch = async () => {
    setIsLoading(true)
    try {
      const res = await fetch(`http://localhost:5000/api/search?query=${query}`)
      const data = await res.json()
      console.log(data.top5URL)
      setResults(data.top5URL)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
    setIsLoading(false)
  }

  return (
    <div
      style={{
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <TextField
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          variant="outlined"
          size="small"
          placeholder="Enter your search query"
          sx={{ flex: 1, mr: 2 }}
        />
        <Button variant="contained" onClick={handleSearch} disabled={isLoading}>
          Search
        </Button>
      </Box>
      {isLoading && <CircularProgress sx={{ my: 2 }} />}
      <div
        style={{
          maxHeight: 'calc(100vh - 150px)',
          maxWidth: 'calc(100vw - 150px)',
          overflowY: 'auto',
          padding: '0rem 1rem',
          margin: '1rem 0rem'
        }}
      >
        <ol>
          {results.map((i, index) => (
            <div key={index} style={{ marginBottom: '20px', width: '100%' }}>
              <li>
                <Typography variant="body1" sx={{ wordWrap: 'break-word' }}>
                  Website: {i.url}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }} >
                  <Typography>View HTML: </Typography>
                  <HtmlModal text={i.text} url={i.url} />
                </Box>
              </li>
            </div>
          ))}
        </ol>
      </div>
    </div>
  )
}

export default WebScraper
