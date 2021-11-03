import React from "react";
import {useParams, Link} from "react-router-dom";
import './style.css';

const itemURL = 'http://localhost:3001/items/';

interface Item {
  id: string;
  name: string;
  description: string;
  imageUrls: [];
  url: string;
   variants: [];
};

interface ChildProps {
  posts: Item[]
};

export const ItemCard: React.FC<ChildProps>= (props) => {
  const { itemId } = useParams<{ itemId: string }>();
  console.log("Item ID:", itemId)

  const foundItem = props.posts.find(singleItem => itemId === singleItem.id);
  console.log("Find Item", foundItem)

  return (
    <div className="itemMain">
      
      {foundItem &&
      <>
        <section>
        <p><Link to={"/"}>Back to Marketplace</Link></p>
        {
          foundItem.imageUrls.map((picture:any, idx ) =>
            <img key={idx} src={picture.url}/>
          )
        }
        </section>
        <section>
        <h2>{foundItem.name}</h2>
        <p>{foundItem.id}</p>
        <p>{foundItem.description}</p>
        {
          foundItem.variants.map((variant:any, idx ) =>
            <p key={idx}>{variant.name}</p>
          )
        }
        </section>
      </>  
      } 
    </div>
  )
};