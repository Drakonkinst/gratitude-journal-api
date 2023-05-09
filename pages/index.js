import styled from 'styled-components'
import Head from 'next/head'
import GratitudeApp from "../components/GratitudeApp"
import useSWR from "swr"

// General data-fetching function
const fetcher = url => fetch(url).then(r => r.json());

export default function Home() {
  const { data, error, mutate } = useSWR(`/api`, fetcher);
  
  if(error) {
    return <p>Error fetching data</p>
  }

  if(!data) {
    return <p>Loading data...</p>
  }
  
  return <>
    <Head>
      <title> Gratitude Journal </title>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap" rel="stylesheet"/>
    </Head>
    <GratitudeApp data={data} error={error} mutate={mutate}/>
  
  </>
}
