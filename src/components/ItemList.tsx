
import React, {useEffect, useState} from "react";
import {BrowserRouter as Router,
        Route,
        Link } from 'react-router-dom';
import { ItemCard } from "components";

const URL = 'http://localhost:3001/items';

export const ItemList: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([])

  const fetchPosts = async () => {
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

// var fetchedPostList: arrayOfObjects[] = posts;

  return  <Router>


  <div style={{display:"flex", flexWrap: "wrap",
  justifyContent: "center"}}>
  {/* <h1>Build Stuff Here for Postal</h1> */}
 

<Route exact path = "/">
  {posts && posts.map((post) => 
    <div key={post.id} style={{border: ".5em solid gray",
      maxWidth: "300px", padding: ".5em", display: "flex",
      flexDirection: "column", margin: ".25em", justifyContent: "space-between"
      }}>
      <p>{post.id}</p>
      <h3>{post.name}</h3>
      <p>{post.description}</p>

      { post && post.variants.length > 0 && 
      post.variants.length < 5
       ?
        post.variants.map((variant:any) =>
        <p key={variant.id}>
          Items: {variant.name}
        </p>
        )
        : post.variants.length > 5 &&
        <p style={{backgroundColor: "lightblue"}}>
      
         There are more than 4 items.

        </p>
      } 
   
      <button style={{padding: "1em", color: "teal"
        }}>
        <Link to={"/" + post.id} className="singleCardItem"><span style={{marginLeft: "1.1em"}}>SELECT</span></Link>
        </button>

    </div>
    )}
</Route>  


  <Route exact path="/:itemId">
   <ItemCard posts= {posts}/>
  </Route>

  </div>
  </Router>
  ;
};
