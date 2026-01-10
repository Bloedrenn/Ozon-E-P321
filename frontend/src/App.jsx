import { useState, useEffect } from 'react'
import axios from 'axios'

import Header from './components/UI/Header'

const API_URL = import.meta.env.VITE_API_URL

function App() {
  // items = [
  //   {id: '1', name: 'Xiaomi Redmi 10', description: 'Топ за свои деньги', isAvailable: true},
  //   {id: '2', name: 'Iphone X', description: 'Крутой телефон (нет) и дорогой (да)', isAvailable: false}
  // ]
  const [items, setItems] = useState([])
  const [itemsLoading, setItemsLoading] = useState(true)
  const [itemsError, setItemsError] = useState(null)

  useEffect(() => {
    axios.get(`${API_URL}/items`)
      .then(response => {
        setItems(response.data)
        setItemsLoading(false)
      })
      .catch(error => {
        console.error(error)
        setItemsLoading(false)
        setItemsError(`Ошибка загрузки вещей: ${error}`)
      })
  }, [])

  if (itemsLoading) return <div>Загрузка...</div>
  if (itemsError) return <div>{itemsError}</div>

  return (
    <>
      <Header />
      <h1>Список вещей</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <strong>{item.name}</strong>: {item.description}
          </li>
        ))}
      </ul>
    </>
  )
}

export default App