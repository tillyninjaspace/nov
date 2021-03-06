import React from "react";
import {useParams, Link} from "react-router-dom";
import "./style.css";

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
  const foundItem = props.posts.find(singleItem => itemId === singleItem.id);
  const priceFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div className="itemMain">
      
      {foundItem &&
      <>
        <section>
        <h4 className="link"><Link to={"/items"}>Back to Marketplace</Link></h4>
        {
          foundItem.imageUrls.map((picture:any, idx ) =>
            <img key={idx} src={picture.url}/>
          )
        }
        </section>
        <section>
        <h2>{foundItem.name}</h2>
        <p>{foundItem.description}</p>
        {foundItem.variants.length > 1? <h3>{foundItem.variants.length} Items</h3>
        : <h3>{foundItem.variants.length} Item</h3>
        }     
        {
          foundItem.variants.map((variant:any, idx ) =>
            <section key={idx} className='variantItem'>
            <h3>Item: {variant.name}</h3>
            <p>Description: {variant.description}</p>
            <h4 className="price">Price: {priceFormatter.format(variant.price)}</h4>
            </section>
          )
        }
        </section>
      </>  
      } 
    </div>
  )
};