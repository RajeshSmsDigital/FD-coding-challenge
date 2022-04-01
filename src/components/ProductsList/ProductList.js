import "./ProductList.scss";
import React, { useEffect } from "react";
import { productsWrapper } from "../../api/ProductsService";

const ProductList = () => {
    const loadBacklogOrders = async () => {
        try {
            const res = await productsWrapper.get();
            console.log(res);
            if (res) {
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        loadBacklogOrders();
    }, []);

    return (
        <div className="product-list">
            <div className="filters">
                <div> Size</div>
                <div> Price</div>
            </div>
            <div className="products">
                <div className="test"> 1</div>
                <div className="test"> 2</div>
                <div className="test"> 3</div>
                <div className="test"> 4</div> 
                <div className="test"> 5</div>
                <div className="test"> 7</div>
            </div>
        </div>
    );
};

export default ProductList;
