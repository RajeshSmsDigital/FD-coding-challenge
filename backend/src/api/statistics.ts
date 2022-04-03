import * as _ from "lodash";
import { getProducts } from "./productsApi";

function firstLogic(data) {
    // group products based on brand
    const brandsGroupWithSamePrice = _.entries(_.countBy(data)).map(
        ([brand, count]) => ({ brand, count })
    );
    const brandWithHighestProdcutsInLimitedPrice = [];
    // // check if there are 1 or more brands have same number of count
    for (const entry of brandsGroupWithSamePrice) {
        if (entry.count == brandsGroupWithSamePrice[0].count) {
            brandWithHighestProdcutsInLimitedPrice.push(entry);
        }
    }
    return brandWithHighestProdcutsInLimitedPrice;
}

function secondLogic(data) {
    // at first group them based on brand
    const grouped = _.groupBy(data, (product) => product.brand);

    // iterate through each group and loop the each size, then push those sizes accordingly to brand
    // while pushing check condition no bsize is pushed twice
    let ListofBrandsWithWholeSizeList = [];
    for (const key in grouped) {
        let listOfSizesForIndividualBrand = [];
        for (const iterator of grouped[key]) {
            for (const i of iterator.sizes) {
                if (!listOfSizesForIndividualBrand.includes(i)) {
                    listOfSizesForIndividualBrand.push(i);
                }
            }
        }
        ListofBrandsWithWholeSizeList.push({
            brand: key,
            sizes: listOfSizesForIndividualBrand,
        });
    }
    // sort in brands in descending order
    ListofBrandsWithWholeSizeList.sort(function (a, b) {
        return b.sizes.length - a.sizes.length;
    });
    // check if there are 1 or more brands have same number of selection sizes
    const brandWithLargestSelectionOfSizes = [];
    for (const entry of ListofBrandsWithWholeSizeList) {
        if (entry.sizes.length == ListofBrandsWithWholeSizeList[0].sizes?.length) {
            brandWithLargestSelectionOfSizes.push(entry);
        }
    }

    return brandWithLargestSelectionOfSizes;
}

function thirdLogic(data) {
    // first created an array of brand with price of size 32

    // here creating a list of brands with avg price
    const groupedBrands = _.groupBy(
        data,
        (product) => product.brand
    );
    const brandsWithAvgpPice = [];
    for (const item in groupedBrands) {
        let price = 0;
        let entrylength = 0;
        for (const entry of groupedBrands[item]) {
            price = price + entry.price;
            entrylength = entrylength + 1;
        }
        brandsWithAvgpPice.push({ brand: item, avgPrice: price / entrylength });
    }

    // sort list of brands with avg price and take fist value

    brandsWithAvgpPice.sort(function (a, b) {
        return a.avgPrice - b.avgPrice;
    });
    const lowestAvgPrice = brandsWithAvgpPice[0];
    return [lowestAvgPrice]
}
export async function getStatistics() {
    const productList = await getProducts();

    const filterByBrand = [];
    const filterByBrandForSize = [];

    for (const iterator of productList) {
        if (iterator.priceO < 40) {
            filterByBrand.push(iterator.brand);
        }
        for (const entry of iterator.sizes) {
            if (entry === "32") {
                filterByBrandForSize.push({
                    brand: iterator.brand,
                    price: iterator.priceO,
                });
            }
        }
    }

    //first question
    const brandWithHighestProdcutsInLimitedPrice = firstLogic(filterByBrand);

    // 2nd question
    const brandWithLargestSelectionOfSizes = secondLogic(productList);

    // 3rd question logic
    const lowestAvgPrice = thirdLogic(filterByBrandForSize)

    const questionList = [{ id : 1, label : "Brand which has the most products that cost less than 40 EUR", value: brandWithHighestProdcutsInLimitedPrice},
    { id : 2, label : "Brand which offers the largest selection of sizes to the customer", value: brandWithLargestSelectionOfSizes},
    { id : 3, label : "Brand that offers the lowest average price for customers wearing size “32”", value: lowestAvgPrice}]

    return questionList;
}
