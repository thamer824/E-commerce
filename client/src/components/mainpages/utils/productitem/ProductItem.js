import React  from 'react'
import BtnRender from './BtnRender'


function ProductItem({product , isAdmin ,handlecheck , deleteProduct}) {


    return (
        <div className="product-card">
              
              {
                isAdmin && <input   type="checkbox" onChange={()=>handlecheck(product._id)} checked={product.checked}  />
              }

            <img src={product.images.url}  width="200px"alt="" />

            <div className="product-box">
                <h2 title={product.title}> {product.title}</h2>
                <span>${product.price}</span>
                <p>${product.description}</p>
                
            </div>
            <BtnRender product={product} deleteProduct={deleteProduct} />

        </div>
    )
}

export default ProductItem