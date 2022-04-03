import React from 'react';
import "./ProductItem.scss";

const ProductItem = ({ product }) => {
    return (
        <div className='Product-cart'>
            <img className='Product-image'
                src={product.images[0]}
                onMouseOver={e => (e.currentTarget.src = product.images[1])}
                onMouseOut={e => (e.currentTarget.src = product.images[0])}
            />
            <div className='Product-bar'>
                <div className='Product-price'>
                    <div className='brand-name'>{product.brand}</div>
                    <div>{product.description}</div>
                    Available Sizes
                    <div className='available-size'>

                        {product.sizes.map((size, index) => (
                            <div key={index}> {size}</div>
                        ))}
                    </div>
                    <div>€{product.priceO}</div>
                </div>
            </div>
        </div>
    );
};
export default ProductItem;

