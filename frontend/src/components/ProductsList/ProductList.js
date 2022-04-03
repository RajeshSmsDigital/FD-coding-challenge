import "./ProductList.scss";
import React, { useEffect, useState } from "react";
import { productsWrapper } from "../../api/DataService";
import ProductItem from '../ProductItem/ProductItem';
import Dropdown from '../DropDown/DropDown'
import Loader from "../Loader/Loader";
import MultiSelectDropdown from "../MultiSelectDropdown/MultiSelectDropdown";
import sizeData from '../../assets/json/size.json';

const ProductList = () => {
    const [productListData, setData] = useState([]);
    const [defaultProductList, setFirstProduct] = useState([]);
    const [filterValue, setFilteredValue] = useState([]);
    const [sortValue, setSortedValue] = useState();


    const loadProducts = async () => {
        try {
            const res = await productsWrapper.getProductList();
            console.log(res);
            if (res) {
                setData(res.data)
                setFirstProduct(res.data)
            }
        } catch (err) {
            console.log(err);
        }
    };


    const setSelectedSize = (selectedSize) => {
        if (selectedSize?.length > 0) {
            setFilteredValue(selectedSize)
        } else {
            setFilteredValue([])
        }
    };

    const setSortedPrice = (sortedData) => {
        if (sortedData) {
            setSortedValue(sortedData)
        } else {
            setSortedValue()
        }
    }

    const filterAndSort = () => {
        if (filterValue.length > 0 && sortValue) {
            const filteredResult = filtering(filterValue, defaultProductList)
            const sortedValue = sorting(sortValue, filteredResult)
            setData(sortedValue)
        } else if (sortValue) {
            const sortedData = sorting(sortValue, defaultProductList)
            setData(sortedData)
        } else if (filterValue.length > 0) {
            const filteredData = filtering(filterValue, defaultProductList)
            setData(filteredData)
        } else {
            setData(defaultProductList)
        }
    }

    const filtering = (filterValue, products) => {
        const filterBySizes = [];

        filterValue.forEach(element => {
            filterBySizes.push(element.label);
        });
        const filterByTagSet = new Set(filterBySizes);

        const result = products.filter((product) =>
            product.sizes.some((tag) => filterByTagSet.has(tag))
        );
        return result
    }

    const sorting = (sortValue, products) => {
        console.log(sortValue)
        const sortByPrice = [...products];
        let newData
        if (sortValue == 0) {
            newData = sortByPrice.sort(function (a, b) {
                return parseFloat(a.priceO) - parseFloat(b.priceO);
            });
        }
        if (sortValue == 1) {
            newData = sortByPrice.sort(function (a, b) {
                return parseFloat(b.priceO) - parseFloat(a.priceO);
            });
        }
        return newData
    }

    useEffect(() => {
        loadProducts();
    }, []);

    useEffect(() => {
        filterAndSort();
    }, [filterValue, sortValue]);

    return (
        <div className="product-list">
            <div className="filters">
                <MultiSelectDropdown title="Size" data={sizeData} multipleSelect={true} selectedData={setSelectedSize} />
                <Dropdown title="Sort by price" sortedData={setSortedPrice}></Dropdown>
            </div>
            <div className="products">
                {productListData.length !== 0
                    ? productListData.map((product) => (
                        <ProductItem
                            key={product.id}
                            product={product}
                        />
                    ))
                    : <div>No Data</div>}
            </div>
        </div>
    );
};

export default ProductList;
