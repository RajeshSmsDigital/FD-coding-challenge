import "./ProductList.scss";
import React, { useEffect, useState } from "react";
import { productsWrapper } from "../../api/ProductsService";
import ProductItem from '../ProductItem/ProductItem';
import Dropdown from '../DropDown/DropDown'
import Loader from "../Loader/Loader";
import MultiSelectDropdown from "../MultiSelectDropdown/MultiSelectDropdown";

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

    const setSelectedSize = (selectedSize) => {
        console.log(selectedSize)
        // setFilteredData(filteredData);
      };

      const setSelectedPrice = (selectedSize) => {
        console.log(selectedSize)
        // setFilteredData(filteredData);
      };

    useEffect(() => {
        loadBacklogOrders();
    }, []);

    return (
        <div className="product-list">
            <div className="filters">
                <MultiSelectDropdown title="Size" selectedData={setSelectedSize}/>
                <MultiSelectDropdown title="Price"selectedData={setSelectedPrice}/>
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
