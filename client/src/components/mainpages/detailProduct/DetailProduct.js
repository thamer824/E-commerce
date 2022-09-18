import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';
import ProductItem from '../utils/productitem/ProductItem';


function DetailProduct() {
    const params = useParams();
    const state = useContext(GlobalState);
    const [products] = state.productApi.products;
    const addCart = state.userApi.addCart;
    const [detailProduct, setDetailProduct] = useState([])


    useEffect(() => {
        // lena kenet if(params) mouch bl id ama bch yokod yrerendi kol mara f ay produit todkholou ama ki thotha params.id uwali yrerendi ken ejdiid mannetha ki yetaabadel l id watha yrendriih
        if (params.id) {
            products.forEach(product => {
                if (product._id === params.id) {
                    setDetailProduct(product)
                }
            })
        }


    }, [params.id, products])

    if (detailProduct.length === 0) return null;



    return (
        <>
            <div className="detail">
                <img src={detailProduct.images.url} alt="" />
                <div className="box-detail">
                    <div className="roww">
                        <h2>{detailProduct.title}</h2>
                        <h6>#id: {detailProduct.product_id}</h6>
                    </div>
                    <span>£{detailProduct.price}</span>
                    <p>{detailProduct.description}</p>
                    <p>{detailProduct.content}</p>
                    <p>Sold:{detailProduct.sold}</p>
                    <Link to="/cart" className="cart" onClick={()=> addCart(detailProduct)}>Buy Now</Link>
                </div>
            </div>

            <div>
                <h2>Related Products</h2>

                <div className="products">
                  {
                    products.map(product =>{
                                         /*  lena tpassi lezmek l key wl produc bch ynajem yaaarfhom   */
                        return product.category === detailProduct.category ? <ProductItem key={product._id} product={product}/> : null
                    })

                  }
 
                </div>
            </div>
        </>
    )
}

export default DetailProduct