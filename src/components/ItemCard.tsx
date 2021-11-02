import React from "react";

interface Item {
  id: number;
  name: string;
  description: string;
  // variants: [];

}

// interface ItemProps {
//   items: Item[]
// }

{/* <ItemProps></ItemProps> */}


interface ChildProps {
  posts: Item[]
}


export const ItemCard: React.FC<ChildProps>= (props) => {
  return (
    <div>
      <p> Hello Item Card</p>

  
      {props.posts.map((thing) => 
        <p key={thing.id}>{thing.name}</p>
      )} 


    </div>
  )
  
  
};
