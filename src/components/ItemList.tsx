
import React, {useEffect, useState} from "react";
import {BrowserRouter as Router,
        Route,
        Link } from "react-router-dom";
import { ItemCard } from "components";

const URL = 'http://localhost:3001/items';
const variantSize = 4

export const ItemList: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([])

  const fetchPosts = async () => {
    try {
        const data = await fetch(URL)
        const response = await data.json();
        console.log("Response", response)
        return response
    } catch (error) {
        console.error(error)
    } 
};

useEffect( () =>{
  fetchPosts()
  .then(data => {
      setPosts(data)
  })
  .catch(error => {
      console.error(error)
  })
},[]);

  return  <Router>

  <div className="itemListMain">

    <Route exact path = "/">
    {posts && posts.map((post) => 
      <div key={post.id} className="itemList">
        <h3>{post.name}</h3>
        <p>Description: {post.description}</p>

        { post && post.variants.length > 0 && 
        post.variants.length < 5
        ?
          post.variants.map((variant:any) =>
          <p key={variant.id}>
            Item: {variant.name}
          </p>
          )
          : post.variants.length >= 5 &&
          <p>
          {
            post.variants.slice(0, variantSize).map((variant:any) => 
            <p key={variant.id}>
              Item: {variant.name}
            
            
            </p>
            )
          }
              <span className="manyVariants">
              ...There are more than 4 items.
              </span>
          </p>
        } 
    
        <button>
          <Link to={"/" + post.id}><span>SELECT</span></Link>
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