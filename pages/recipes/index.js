import Head from 'next/head'
import Image from 'next/image'
import Card from '../../components/card'
import Header from '../../components/header'
import { fetchRecipe } from '../../lib/api'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'

export default function Recipes({recipes}) {

  const helloFreshImageURL = `https://img.hellofresh.com/hellofresh_s3`;
  console.log(recipes.data)
  return (
    <div className={styles.container}>
      <Head>
        <title>All Recipes | Benny Fresh</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      <main className="">
        <div className="flex flex-row justify-center">
          <h1 className="">
            Hi Ben, let's get cooking.
          </h1>
        </div>
        <div className="flex flex-row">
            {recipes.data.map((r) => {
                return (
                   <a key={r.id} href={"/recipes/" + r.id}><Card recipe={r}></Card></a>
                )
            })}
        </div>
      </main>

      <footer className="">
        
      </footer>
    </div>
  )
}

export async function getStaticProps() {
    const recipes = await fetch('http://localhost:3000/api/recipes', {
        method: 'get',
      }).then(recipes => recipes.json()) ?? []
  
  return {
    props: { 
     recipes,
      
    },
    
  }
}

/* const addRecipe = async event => {
  event.preventDefault();
  const res = await fetchRecipe(event.target.freshID.value);
  if(res.name != '') {
    console.log(res)
    event.target.freshID.value = '';
    const response = await fetch('http://localhost:3000/api/recipe', {
      method: 'post',
      body: JSON.stringify(res)
    })

    console.log(response)
  }
} */