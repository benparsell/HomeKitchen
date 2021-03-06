import Head from 'next/head'
import Image from 'next/image'
import Card from '../../components/card'
import Header from '../../components/header'
import { fetchRecipe } from '../../lib/api'
import styles from '../../styles/Home.module.css'
import Link from 'next/link'
import { useState } from 'react'

export default function Recipes({recipes}) {
   //     set search query to empty string
   const [q, setQ] = useState("");
   console.log(q);
   //     set search parameters
   //     we only what to search countries by capital and name
   //     this list can be longer if you want
   //     you can search countries even by their population
   // just add it to this array
   const [searchParam] = useState(["name"]);

   function search(items) {
    return items.filter((item) => {
        return searchParam.some((newItem) => {
            return (
                item[newItem]
                    .toString()
                    .toLowerCase()
                    .indexOf(q.toLowerCase()) > -1
            );
        });
    });
  }

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
          <section className="flex-col md:flex-row flex items-center md:justify-center mt-16 mb-16 md:mb-12">
            <input onChange={(e) => setQ(e.target.value)} value={q} className={styles.search + " shadow appearance-none rounded w-3/5 py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"} type="text" placeholder="Search..."/>
          </section>
        </div>
        <div className="flex flex-wrap">
            {search(recipes.data).map((r) => {
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
