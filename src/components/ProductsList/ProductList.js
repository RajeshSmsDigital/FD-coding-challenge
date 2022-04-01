import "./ProductList.scss";
import React, { useEffect, useState } from "react";
import { productsWrapper } from "../../api/ProductsService";
import ProductItem from '../ProductItem/ProductItem';
import Loader from "../Loader/Loader";

const ProductList = () => {
    const [productListData, setData] = useState([]);
    const loadBacklogOrders = async () => {
        try {
            const res = await productsWrapper.get();
            console.log(res);
            if (res) {
                setData(res.data)
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
                {productListData.length !== 0
                    ? productListData.map((product) => (
                        <ProductItem
                            key={product.id}
                            product={product}
                        />

                    ))
                    : <Loader />}
            </div>
        </div>
    );
};

export default ProductList;
