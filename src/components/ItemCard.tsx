import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";


const itemURL = 'http://localhost:3001/items/'

interface Item {
  id: string;
  name: string;
  description: string;
  imageUrls: [];
  // variants: [];
  url: string;

}


interface ChildProps {
  posts: Item[]
}

export const ItemCard: React.FC<ChildProps>= (props) => {

  // const itemId = useParams()
  const { itemId } = useParams<{ itemId: string }>();
  console.log("Item ID:", itemId)

  const foundItem = props.posts.find(singleItem => itemId === singleItem.id);
  console.log("Find Item", foundItem)


  return (
    <div>
      {foundItem &&
      <>
        <h2>{foundItem.name}</h2>
        <p>{foundItem.id}</p>
        <p>{foundItem.description}</p>
        {
          foundItem.imageUrls.map((picture:any, idx ) =>
            <p key={idx}>{picture.url}</p>
          )
        }
        
      </>  
      } 


    </div>
  )
  
  
};
