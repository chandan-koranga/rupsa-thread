import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearErrors,
  getProduct,
  getProductCategory,
} from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Slider, Typography } from "@mui/material";
import Pagination from "react-js-pagination";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import "./ProductsCategory.css";

const ProductCategory = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [ratings, setRatings] = useState(0);
  const [showSlider, setShowSlider] = useState(false);

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const { category } = useParams();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  const toggleSlider = () => {
    setShowSlider(!showSlider);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct("", currentPage, price, category, ratings));
  }, [dispatch, currentPage, price, category, ratings, alert, error]);

  return (
    <Fragment>
      <MetaData title="PRODUCTS -- ECOMMERCE" />
      <div className="products-container">
        <h2 className="products-heading">{category}</h2>
        <div className={`filter-box ${showSlider ? "show" : ""}`}>
          <button className="slider-toggle" onClick={toggleSlider}>
            Filter
          </button>
          {showSlider && (
            <div className="slider-container">
              <Typography>Price</Typography>
              <Slider
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"
                min={0}
                max={25000}
              />

              <fieldset>
                <Typography component="legend">Ratings Above</Typography>
                <Slider
                  value={ratings}
                  onChange={(e, newRating) => setRatings(newRating)}
                  aria-labelledby="continuous-slider"
                  valueLabelDisplay="auto"
                  min={0}
                  max={5}
                />
              </fieldset>
            </div>
          )}
        </div>

        <div className="products">
          {products &&
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
        </div>

        {resultPerPage < filteredProductsCount && (
          <div className="pagination-box">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productsCount}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="page-item-active"
              activeLinkClass="page-link-active"
            />
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default ProductCategory;

// import React, { Fragment, useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";
// import { clearErrors, getProduct } from "../../actions/productAction";
// import { useAlert } from "react-alert";
// import { Slider, Typography } from "@mui/material";
// import Pagination from "react-js-pagination";
// import MetaData from "../layout/MetaData";
// import Loader from "../layout/Loader/Loader";
// import ProductCard from "../Home/ProductCard";
// import "./Products.css";

// // const categories = [
// //   "Laptop",
// //   "Footwear",
// //   "Bottom",
// //   "Tops",
// //   "Attire",
// //   "Camera",
// //   "SmartPhones",
// // ];

// const ProductCategory = () => {
//   const dispatch = useDispatch();
//   const alert = useAlert();

//   const [currentPage, setCurrentPage] = useState(1);
//   const [price, setPrice] = useState([0, 25000]);
//   //   const [category, setCategory] = useState("");
//   const [ratings, setRatings] = useState(0);
//   const [showSlider, setShowSlider] = useState(false);

//   const {
//     products,
//     loading,
//     error,
//     productsCount,
//     resultPerPage,
//     filteredProductsCount,
//   } = useSelector((state) => state.products);

//   const { category } = useParams();
//   console.log(category);

//   const setCurrentPageNo = (e) => {
//     setCurrentPage(e);
//   };

//   const priceHandler = (event, newPrice) => {
//     setPrice(newPrice);
//   };

//   const toggleSlider = () => {
//     setShowSlider(!showSlider);
//   };

//   useEffect(() => {
//     if (error) {
//       alert.error(error);
//       dispatch(clearErrors());
//     }
//     // console.log(category, "inuseeffect");

//     // dispatch(getProduct(currentPage, price, category, ratings));
//   }, [dispatch, category, currentPage, price, ratings, alert, error]);

//   return <Fragment></Fragment>;
// };

// export default ProductCategory;
