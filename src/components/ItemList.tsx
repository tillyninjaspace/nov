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
  <h1>Wander Market</h1>
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
          <div key={variant.id}>
            Item: {variant.name}
          </div>
          )
          : post.variants.length >= 5 &&
          <div>
          {
            post.variants.slice(0, variantSize).map((variant:any) => 
            <div key={variant.id}>
              <p className="variantItems">Item: {variant.name}</p>
            </div>
            )
          }
              <span className="manyVariants">
              ...plus {post.variants.length-variantSize} more
              </span>
          </div>
        } 
    
        <h4>
          <Link to={"/" + post.id}>SELECT</Link>
        </h4>

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