import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import TodoBucket, { todoPostInterface } from '../components/TodoBucket'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import React, {useState} from 'react'

const portNumber = 3001 //8081 //3001
// const hostName = `172.25.0.2`
const hostName = `todo-list_server_1`

const Home: NextPage = ({data}:any) => {
  console.log(data)

  const [responseData, setResponseData] = useState({})

  const addNewTodo = async(data:todoPostInterface)=> {

    const headers = {
      // "Content-Type": "application/json; 'text/json';"
      "content-type": "application/json"
    }
  
    const api_url = `http://localhost:8081/api/add`
    
    try{
      console.log(api_url, data)
      const response = await axios.post(api_url, data, {headers: headers})
      return response
    }catch(error){
      return error
    }
  }

  return (
    <div className={styles.main}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className='font-bold text-2xl'>Todo List</h1>
      <TodoBucket todoArray={data} addNewTodo={addNewTodo} />
      {/* <div className='flex flex-row gap-8'>
        {
          [1,2,3].map((numb, idx)=> {
            return(
              <TodoBucket key={idx} todoArray={data} addNewTodo={addNewTodo} />
            )
          })
        }
      </div> */}
    </div>
  )
}

export const getServerSideProps = async()=> {
  const api_url = `http://${hostName}:${portNumber}/api/view`
  try{
    const res = await fetch(api_url)
    const data = await res.json()
  
    return{
      props: {data}  
    }
  }catch(error){
    return{
      props: {error}
    }
  }
}

export default Home
