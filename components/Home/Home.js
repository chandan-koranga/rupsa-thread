import React, { Fragment, useEffect, useState } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import nav from "../../images/nav.png";
import banner from "../../images/banner.jpg";
import banners from "../../images/banners.jpg";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import { Fade } from "react-slideshow-image";
import Carousel from "react-material-ui-carousel";
const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  // const [gender,setGender]=useState("")

  const { loading, error, products } = useSelector((state) => state.products);
  // const handleClick=()=>{

  // }
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct());
  }, [dispatch, error, alert]);

  // Group products by category
  const productsByCategory = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  return (
    <Fragment>
      {/* <header>
        <nav className="navbar">
          <Link to="/">
            <img src={nav} alt="Ecommerce" />
          </Link>
          <Link to="/">Home</Link>
          <Link to="/product/gender/men">Men</Link>
          <Link to="/product/gender/women">Women</Link>
          <Link to="/product/gender/unisex">Unisex</Link>
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <button>Search</button> comment krna hai 
            <IconButton color="primary">
              <SearchIcon />
            </IconButton>
          </div>
          <div className="auth-buttons">
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        </nav>
      </header> */}

      <MetaData title="Fashion E-Commerce" />
      {/* <div className="test">
        <Fade className="test-silder">
          {fadeImages.map((fadeImage, index) => (
            <div key={index}>
              <img style={{ width: "100%" }} src={fadeImage.url} alt="banner" />
              <h2>{fadeImage.caption}</h2>
            </div>
          ))}
        </Fade>
      </div> */}
      {/* <div className="test">
        <Carousel>
          <img src={banners} alt="banner" />
          
        </Carousel>
      </div> */}

      <div className="banner">
        <div className="banner-content">
          <h1>Welcome to Our Fashion Store</h1>
          <p>Discover the Latest Trends Below</p>
        </div>
        <a href="#container" className="scroll-button">
          Scroll <CgMouse />
        </a>
      </div>

      <section className="featured-categories">
        {loading ? (
          <Loader />
        ) : (
          Object.entries(productsByCategory).map(
            ([category, categoryProducts]) => (
              <Fragment key={category}>
                <div className="catergory-box">
                  <h2 className="category-heading">{category}</h2>
                  <div className="product-container" id="container">
                    {categoryProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              </Fragment>
            )
          )
        )}
      </section>
    </Fragment>
  );
};

export default Home;

// import React, { Fragment, useEffect } from "react";
// import { CgMouse } from "react-icons/cg";
// import "./Home.css";
// import MetaData from "../layout/MetaData";
// import { useDispatch, useSelector } from "react-redux";
// import { clearErrors, getProduct } from "../../actions/productAction";
// import Loader from "../layout/Loader/Loader";
// import { useAlert } from "react-alert";
// import ProductCard from "./ProductCard";

// const Home = () => {
//   const dispatch = useDispatch();
//   const alert = useAlert();

//   const { loading, error, products } = useSelector((state) => state.products);

//   useEffect(() => {
//     if (error) {
//       alert.error(error);
//       dispatch(clearErrors());
//     }

//     dispatch(getProduct());
//   }, [dispatch, error, alert]);

//   // Group products by category
//   const productsByCategory = products.reduce((acc, product) => {
//     if (!acc[product.category]) {
//       acc[product.category] = [];
//     }
//     acc[product.category].push(product);
//     return acc;
//   }, {});

//   return (
//     <Fragment>
//       <MetaData title="Fashion E-Commerce" />

//       <div className="banner">
//         <div className="banner-content">
//           <h1>Welcome to Our Fashion Store</h1>
//           <p>Discover the Latest Trends Below</p>
//         </div>
//         <a href="#container" className="scroll-button">
//           Scroll <CgMouse />
//         </a>
//       </div>

//       <section className="featured-categories">
//         {loading ? (
//           <Loader />
//         ) : (
//           Object.entries(productsByCategory).map(
//             ([category, categoryProducts]) => (
//               <Fragment key={category}>
//                 <h2 className="category-heading">{category}</h2>
//                 <div className="product-container" id="container">
//                   {categoryProducts.map((product) => (
//                     <ProductCard key={product.id} product={product} />
//                   ))}
//                 </div>
//               </Fragment>
//             )
//           )
//         )}
//       </section>
//     </Fragment>
//   );
// };

// export default Home;

// import React, { Fragment, useEffect } from "react";
// import { CgMouse } from "react-icons/cg";
// import "./Home.css";
// import MetaData from "../layout/MetaData";
// import { useDispatch, useSelector } from "react-redux";
// import { clearErrors, getProduct } from "../../actions/productAction";
// import Loader from "../layout/Loader/Loader";
// import { useAlert } from "react-alert";
// import ProductCard from "./ProductCard";

// const Home = () => {
//   const dispatch = useDispatch();
//   const alert = useAlert();

//   const { loading, error, products } = useSelector((state) => state.products);
//   // let loading = true;
//   useEffect(() => {
//     if (error) {
//       alert.error(error);
//       dispatch(clearErrors());
//     }

//     dispatch(getProduct());
//   }, [dispatch, error, alert]);

//   return (
//     <Fragment>
//       {loading ? (
//         <Loader />
//       ) : (
//         <Fragment>
//           <MetaData title="ECOMMERCE" />

//           <div className="banner">
//             <p>Welcome to Ruspa Thread</p>
//             <h1>FIND AMAZING PRODUCTS BELOW</h1>

//             <a href="#container">
//               <button>
//                 Scroll <CgMouse />
//               </button>
//             </a>
//           </div>

//           <h2 className="homeHeading">Feature Products</h2>

//           <div className="container" id="container">
//             {products &&
//               products.map((product) => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//           </div>
//         </Fragment>
//       )}
//     </Fragment>
//   );
// };

// export default Home;
