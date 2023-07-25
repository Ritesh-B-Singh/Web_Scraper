import WebScraper from './components/WebScraper'

function App() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'ceenter',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <h1>Web Scraper App</h1>
      <WebScraper />
    </div>
  )
}

export default App
