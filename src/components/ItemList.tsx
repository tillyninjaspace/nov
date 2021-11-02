import React, {useEffect, useState} from "react";

const URL = 'http://localhost:3001/items';

export const ItemList: React.FC = () => {

  const [posts, setPosts] = useState<any[]>([])

  async function fetchPosts() {
    try {
        console.log("starting to fetch")
        const data = await fetch(URL)
        console.log(data)
        const response = await data.json();
        console.log("Response", response)
        return response
    } catch (error) {
        console.error(error)
    } finally {
        //Maybe add interstitial
    }
};

useEffect( () =>{
  fetchPosts()
  .then(data => {
      setPosts(data)
      console.log("Posts", posts)
  })
  .catch(error => {
      console.error(error)
  })
},[]);


  return  <div style={{display:"flex", flexWrap: "wrap"}}>
  {/* <h1>Build Stuff Here for Postal</h1> */}
 
  {posts && posts.map((post) => 
    <div key={post.id} style={{border: ".5em solid gray",
      maxWidth: "250px", padding: "1em"
      }}>
      <p>{post.id}</p>
      <p>{post.name}</p>
      <p>{post.description}</p>
      {/* { post.imageUrls((image: any) =>
      <p>{image}</p>
      )} */}
    </div>
  
  )}
  </div>
  ;
};
