// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') || initialName

  // LAZY INITIALIZER 
  // Quando o useState() recebe uma função, em vez de um valor como estado inicial,
  // essa função é executada apenas durante a fase mount do componente, sem se retpetir no update
  const [name, setName] = React.useState(() => window.localStorage.getItem('name') || initialName)
  const [nameUC, setNameUC] = React.useState(() => window.localStorage.getItem('nameUC') || initialName)
  const [count, setCount] = React.useState(0)
  

  // 🐨 Here's where you'll use `React.useEffect`.
  // The callback should set the `name` in localStorage.
  // 💰 window.localStorage.setItem('name', name)

  function handleClick(event) {
    setNameUC(event.target.value.toUpperCase())
  }


  function handleChange(event) {
    setName(event.target.value)    
    window.localStorage.setItem('name', name)
  }

  // Efeito colateral a ser executado após o componente ter sido atualizado
  React.useEffect(() => {
    // O valor do localStorage setá atualizado após a atualização do componente
    window.localStorage.setItem('name', name)
    window.localStorage.setItem('nameUC', nameUC)
    setCount(count + 1)
  }, [name, nameUC])

  //onClick={handleClick}

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange = { (e) => { handleChange(e); handleClick(e) } }  id="name" />
      </form>
      {name ? <strong>Hello {name}, {nameUC}</strong> : 'Please type your name'}
      <p>localStorage: {window.localStorage.getItem('name')} - {window.localStorage.getItem('nameUC')}</p>
      <p>contagem: {count}</p>
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
