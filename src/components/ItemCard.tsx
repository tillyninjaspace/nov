import React from "react";

interface Item {
  name: string;
  description: string;
  variants: [];
}

interface ItemProps {
  items: Item[]
}

export const ItemCard: React.FC<ItemProps> = (props) => {
  return (
    <div>
      {props.items[1].name}
    </div>
  )
  
  
};
