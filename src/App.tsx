import { useEffect, useState } from 'react'
import './App.css'
import { UsersList } from './components/UsersList'
import { type User } from './types.d'

function App () {
  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)
  const ToggleColors = () => {
    setShowColors(!showColors)
  }
  const toggleSortByCountry = () => {
    setSortByCountry(prevState => !prevState)
  }
  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then(async res => await res.json())
      .then(data => {
        setUsers(data.results)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])
  const sortedUsers = sortByCountry
    ? [...users].sort((a, b) => a.location.country.localeCompare(b.location.country))
    : users
  const handleDelete = (email: string) => {
    const filteredUsers = users.filter(user => user.email !== email)
    setUsers(filteredUsers)
  }

  return (
    <div className="App">
      <h1>Prueba Tecnica</h1>
      <header>
        <button onClick={ToggleColors}>
          Colorear Filas
        </button>
        <button onClick={toggleSortByCountry}>
         {sortByCountry ? 'No ordenar por País' : 'Ordenar por País'}
        </button>
      </header>
      <UsersList deleteUser={handleDelete} showColors={showColors} users={sortedUsers} />
    </div>
  )
}

export default App
