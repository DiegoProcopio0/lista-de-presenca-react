// => Utilizando estado // em vez de uma variavel normal//
// => Porém o estado também é uma variavel 
// => Sempre usar {} quando for utilizar uma variavel em arquivos JSX

import React,{ useState, useEffect } from 'react';

import './styles.css';

import { Card }  from '../../components/card';

export function Home() {

  const [studentName, setStudentName] = useState("")
  const [students, setStudent] = useState([])
  const [user, setUser] = useState({name: '', avatar: ''})

    function handleAddStudenty() {
      const newStudent = {
        name: studentName,
        time: new Date().toLocaleTimeString('pt-br', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      }
      setStudent(prevState => [...prevState, newStudent])

    }

    useEffect(() => {
      async function fetchData() {
        const response = await fetch('https://api.github.com/users/diegoprocopio0')
        const data = await response.json()
        console.log(data)
         setUser({
          name: data.name,
          avatar: data.avatar_url
        })
      }

      fetchData()
    }, [])

  return (
    <div className='container'>
      <header>
        <h1>Lista de presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Imagem do github" />
        </div>
      </header>

      <input 
      type="text" 
      placeholder="Type your name"
      onChange={e => setStudentName(e.target.value
        )}
      />

      <button type="button" onClick={handleAddStudenty}>
        add
        </button>

{
    students.map(
      student => 
         (
        <Card 
          key=  {student.time}
          name= {student.name} 
          time= {student.time} 
          />
        )
    )
}
   </div>
  )
}

