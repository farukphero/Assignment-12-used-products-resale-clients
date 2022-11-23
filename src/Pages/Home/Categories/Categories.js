import React, { useEffect, useState } from "react";
import Category from "../Category/Category";

const Categories = () => {
    const [categories, setCategories] = useState([])

    useEffect(()=>{
        fetch('category.json')
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            setCategories(data)
        })
    },[])
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
            categories.map(category=><Category
                key={category._id}
                category={category}
            >
            </Category>)
        }
    </div>
  );
};

export default Categories;