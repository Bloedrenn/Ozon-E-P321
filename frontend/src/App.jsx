import { useState, useEffect } from 'react'
import axios from 'axios'

import Header from '@components/UI/Header'
import Image from '@components/Image'

import carImgUrl from './images/car.jpg'

const API_URL = import.meta.env.VITE_API_URL

function App() {
  // items = [
  //   {id: '1', name: 'Xiaomi Redmi 10', description: 'Топ за свои деньги', isAvailable: true},
  //   {id: '2', name: 'Iphone X', description: 'Крутой телефон (нет) и дорогой (да)', isAvailable: false}
  // ]
  const [items, setItems] = useState([])
  const [itemsLoading, setItemsLoading] = useState(true)
  const [itemsError, setItemsError] = useState(null)
  const [tempText, setTempText] = useState("Hello World!")
  const [userText, setUserText] = useState('')

  const pClick = () => { 
    console.log("Нажали на p")
    setTempText(10)
  }

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
      <Header text="Шапка сайта" title="ХЕЛЛО" />
      <p onClick={pClick} onMouseEnter={() => console.log("Навели курсор на p")}>{tempText}</p>
      <h1>Список вещей</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            <strong>{item.name}</strong>: {item.description}
          </li>
        ))}
      </ul>
      <Header text="МОН" />

      {/* <img src='https://assets.avtocod.ru/storage/images/articles-2022/otnyud-ne-bmw-top-10-samykh-dorogikh-mashin-mira-v-2022-godu/otnyud-ne-bmw-top-10-samykh-dorogikh-mashin-mira-v-2022-godu-3-min.jpg' /> */}
      {/* <img src={carImgUrl} /> */}
      <Image imageUrl={carImgUrl} />

      <div>Вы ввели: {userText}</div>
      <input onChange={event => setUserText(event.target.value)} />
    </>
  )
}

export default App