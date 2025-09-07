import Button from '../Button/Button'
import Header from '../Header/Header'
import './App.css'

function App() {
 

  return (
    <>
  <Header />
  <Button variant="btn--filled" onClick={() => alert('Butona tıklandı!')}>
    Tıkla Beni
  </Button>
    </>
  )
}

export default App
