import "./ProductList.scss";
import React, { useEffect, useState, useCallback } from "react";
import { productsWrapper } from "../../api/DataService";
import ProductItem from '../ProductItem/ProductItem';
import Dropdown from '../DropDown/DropDown'
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

    const filterAndSort = useCallback(() => {
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
    }, [filterValue, sortValue, defaultProductList])

    const filtering = (filterValue, products) => {
        const filterBySizes = filterValue.reduce((obj, item) => {
            obj.push(item.label);
            return obj
        }, []);

        const filterByTagSet = new Set(filterBySizes);

        const result = products.filter((product) =>
            product.sizes.some((tag) => filterByTagSet.has(tag))
        );
        return result
    }

    const sorting = (sortValue, products) => {
        const sortByPrice = [...products];
        let newData
        if (sortValue === 1) {
            newData = sortByPrice.sort(function (a, b) {
                return parseFloat(a.priceO) - parseFloat(b.priceO);
            });
        }
        if (sortValue === 2) {
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
    }, [filterValue, sortValue, filterAndSort]);

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
                    : <div className="no-data">No Data Found</div>}
            </div>
        </div>
    );
};

export default ProductList;
