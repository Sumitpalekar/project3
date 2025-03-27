import React from 'react'
import ProductCard from './product-card';
import "../resources/category-preview.styles.scss";
function CategoryPreview({title,products}) {
  return (
    <div className="category-preview-container">
        <h2 style={{fontWeight:"400"}}>
            <span className="title">{title.toUpperCase()}</span>
        </h2>
        <div className="preview">
            {
                products.filter((_,idx)=>(idx < 4)).map((product)=>(
                    <ProductCard key={product.id} product={product}/>
                ))
            }
        </div>
    </div>
  )
}

export default CategoryPreview