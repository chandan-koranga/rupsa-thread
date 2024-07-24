import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, CardMedia } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { getMultipleProducts } from "../../actions/productAction";
import Products from "./Products";

const RecommendedCard = ({ id }) => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.productMultipleDetails
  );
  // console.log(products, "hello");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const extractProductId = id.split(".")[0].replace("rupsa image\\", "");

    const fetchData = async () => {
      try {
        dispatch(getMultipleProducts([extractProductId]));

        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id]);

  if (!Array.isArray(products) || products.length === 0) {
    if (loading) return <div>Loading...</div>;
    if (error)
      return <div>Error: {error.message || "Failed to fetch products"}</div>;
    return null;
  }

  const ids = id.split(".")[0].replace("rupsa image\\", "");
  const product = products.find((p) => p._id === ids);

  // console.log(product, "finding product ");

  // const imagePath =
  //   product.images && product.images.length > 0 ? product.images[0].url : "";
  return (
    <div>
      {/* {products.length === 5 &&
        products.map((product, i) => ( */}
      {product && (
        <>
          <Link className="productCard" to={`/product/${product._id}`}>
            {/* <h1>Similar product</h1> */}
            <Card>
              {/* {console.log(products.length, "inside products here", product)} */}
              <CardMedia
                component="img"
                height="150"
                image={product.images[0].url}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {product.name}
                </Typography>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <span className="productCardSpan">
                    ({product.numOfReviews} Reviews)
                  </span>
                </div>
                <Typography variant="h6" color="textSecondary">
                  ₹{product.price}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </>
      )}
      {/* ))} */}
    </div>
  );

  //   {products.length>0 &&
  //     products.map((product,i)=>(
  // <>
  // <Link className="productCard" to={`/product/${products[0].id}`}>
  //     <h1>Similar product</h1>
  //     <Card>
  //       <CardMedia
  //         component="img"
  //         height="150"
  //         image={product.images[0].url}
  //         alt={product.name}
  //       />
  //       <CardContent>
  //         <Typography variant="h6" gutterBottom>
  //           {products[0].name}
  //         </Typography>
  //         <div style={{ display: "flex", alignItems: "center" }}>
  //           <span className="productCardSpan">
  //             ({products[0].numOfReviews} Reviews)
  //           </span>
  //         </div>
  //         <Typography variant="h6" color="textSecondary">
  //           ₹{products[0].price}
  //         </Typography>
  //       </CardContent>
  //     </Card>
  //   </Link>
  // </>
  //       ))

  //     }

  //   );
};

export default RecommendedCard;

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Card, CardContent, Typography, CardMedia } from "@mui/material";
// import { useSelector, useDispatch } from "react-redux";
// import { getMultipleProducts } from "../../actions/productAction";

// const RecommendedCard = ({ id }) => {
//   const dispatch = useDispatch();
//   const { products, loading, error } = useSelector(
//     (state) => state.productMultipleDetails || {}
//   );
//   console.log(products, "from cards");
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const extractProductId = id.split(".")[0].replace("rupsa image\\", "");

//     const fetchData = async () => {
//       try {
//         await dispatch(getMultipleProducts([extractProductId]));
//         setIsLoading(false);
//       } catch (err) {
//         console.error("Error fetching products:", err);
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [dispatch, id]);

//   if (loading) return <div>Loading...</div>;

//   if (error)
//     return <div>Error: {error.message || "Failed to fetch products"}</div>;

//   if (!Array.isArray(products) || products.length === 0) {
//     return <div>No products found</div>;
//   }

//   const product = products.find((p) => p.id === id);
//   // if (!product) return <div>No product found</div>;

//   // Ensure product has images before accessing
//   // const imagePath =
//   //   product.images && product.images.length > 0 ? product.images[0].url : "";

//   return (
//     <>
//       {product && product.length > 0 && (
//         <Link className="productCard" to={`/product/${product.id}`}>
//           <h1>Similar product</h1>
//           <Card>
//             <CardMedia
//               component="img"
//               height="150"
//               image={product.images[0].url}
//               alt={product.name}
//             />
//             <CardContent>
//               <Typography variant="h6" gutterBottom>
//                 {product.name}
//               </Typography>
//               <div style={{ display: "flex", alignItems: "center" }}>
//                 <span className="productCardSpan">
//                   ({product.numOfReviews} Reviews)
//                 </span>
//               </div>
//               <Typography variant="h6" color="textSecondary">
//                 ₹{product.price}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Link>
//       )}
//     </>
//   );
// };

// export default RecommendedCard;

// import React, { useEffect, useMemo } from "react";
// import { Link } from "react-router-dom";
// import { Card, CardContent, Typography, CardMedia } from "@mui/material";
// import { useSelector, useDispatch } from "react-redux";
// import { unstable_batchedUpdates as batchedUpdates } from "react-dom"; // Import unstable_batchedUpdates from react-dom
// import { getProductDetails1 } from "../../actions/productAction";

// const RecommendedCard = ({ id }) => {
//   const dispatch = useDispatch();

//   const fetchProductDetails = useMemo(() => {
//     return (id) => {
//       //   if (id) {
//       // Ensure id is defined before proceeding
//       const productId = id.split(".")[0].replace("rupsa image\\", "");
//       dispatch(getProductDetails1(productId));
//     };
//     // };
//   }, [dispatch]);

//   useEffect(() => {
//     // if (Array.isArray(ids)) {
//     // Use unstable_batchedUpdates to batch updates
//     batchedUpdates(() => {
//       // ids.forEach((id) => fetchProductDetails(id));
//       fetchProductDetails(id);
//     });
//     // } else {
//     // fetchProductDetails(ids);
//     // }
//   }, [id, fetchProductDetails]);

//   const { product } = useSelector((state) => state.product1);

//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   if (Object.keys(product).length === 0) {
//     return <div>No product found</div>;
//   }

//   return (
//     <Link className="productCard" to={`/product/${product._id}`}>
//       <h1>Similar product</h1>
//       <Card>
//         <CardMedia
//           component="img"
//           height="150"
//           image={product.images[0].url}
//           alt={product.name}
//         />
//         <CardContent>
//           <Typography variant="h6" gutterBottom>
//             {product.name}
//           </Typography>
//           <div style={{ display: "flex", alignItems: "center" }}>
//             <span className="productCardSpan">
//               ({product.numOfReviews} Reviews)
//             </span>
//           </div>
//           <Typography variant="h6" color="textSecondary">
//             ₹{product.price}
//           </Typography>
//         </CardContent>
//       </Card>
//     </Link>
//   );
// };

// export default RecommendedCard;

// --------Working for 1 product
// import React, { useEffect, useMemo } from "react";
// import { Link } from "react-router-dom";
// import { Card, CardContent, Typography, CardMedia } from "@mui/material";
// import { useSelector, useDispatch } from "react-redux";
// import { getProductDetails1 } from "../../actions/productAction";

// const RecommendedCard = ({ id }) => {
//   const imagePath = id;
//   const ids = imagePath.split(".")[0].replace("rupsa image\\", "");
//   const dispatch = useDispatch();

//   const fetchProductDetails = useMemo(() => {
//     return () => {
//       const ids = id.split(".")[0].replace("rupsa image\\", "");
//       dispatch(getProductDetails1(ids));
//     };
//   }, [dispatch, id]);

//   useEffect(() => {
//     fetchProductDetails();
//   }, [fetchProductDetails]);

//   const { product } = useSelector((state) => state.product1);

//   // Check if product is loading
//   if (!product) {
//     return <div>Loading...</div>;
//   }

//   // Check if product is empty
//   if (Object.keys(product).length === 0) {
//     return <div>No product found</div>;
//   }

//   return (
//     <Link className="productCard" to={`/product/${ids}`}>
//       <h1>Similar product</h1>
//       <Card>
//         <CardMedia
//           component="img"
//           height="150"
//           image={product.images[0].url}
//           alt={product.name}
//         />
//         <CardContent>
//           <Typography variant="h6" gutterBottom>
//             {product.name}
//           </Typography>
//           <div style={{ display: "flex", alignItems: "center" }}>
//             <span className="productCardSpan">
//               ({product.numOfReviews} Reviews)
//             </span>
//           </div>
//           <Typography variant="h6" color="textSecondary">
//             ₹{product.price}
//           </Typography>
//         </CardContent>
//       </Card>
//     </Link>
//   );
// };

// export default RecommendedCard;

// --------original-------
// import React, { useCallback, useEffect, useMemo } from "react";
// import { Link } from "react-router-dom";
// import { Card, CardContent, Typography, CardMedia } from "@mui/material";
// import { Rating } from "@mui/material";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   clearErrors,
//   getProductDetails,
//   getProductDetails1,
//   newReview,
// } from "../../actions/productAction";

// const RecommendedCard = ({ id }) => {
//   //   console.log(id);
//   const imagePath = id;
//   const ids = imagePath.split(".")[0].replace("rupsa image\\", "");
//   const dispatch = useDispatch();

//   const fetchProductDetails = useMemo(() => {
//     return () => {
//       const ids = id.split(".")[0].replace("rupsa image\\", "");
//       dispatch(getProductDetails1(ids));
//     };
//   }, [dispatch, id]);

//   // Effect to fetch product details when component mounts or id changes
//   useEffect(() => {
//     fetchProductDetails();
//   }, [fetchProductDetails]);

//   const { product } = useSelector((state) => state.product1);
//   console.log(product);
//   return (
//     <Link className="productCard" to={`/product/${ids}`}>
//       <h1>similar product</h1>
//       {product.length > 0 && (
//         <Card>
//           <CardMedia
//             component="img"
//             height="150"
//             image={product.images[0].url}
//             alt={product.name}
//           />
//           <CardContent>
//             <Typography variant="h6" gutterBottom>
//               {product.name}
//             </Typography>
//             <div style={{ display: "flex", alignItems: "center" }}>
//               <span className="productCardSpan">
//                 {" "}
//                 ({product.numOfReviews} Reviews)
//               </span>
//             </div>
//             <Typography variant="h6" color="textSecondary">
//               ₹{product.price}
//             </Typography>
//           </CardContent>
//         </Card>
//       )}
//     </Link>
//   );
// };

// export default RecommendedCard;

// import React, { useCallback, useEffect, useMemo, useState } from "react";
// import { Link } from "react-router-dom";
// import { Card, CardContent, Typography, CardMedia } from "@mui/material";
// import { Rating } from "@mui/material";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   clearErrors,
//   getProductDetails,
//   getProductDetails1,
//   newReview,
// } from "../../actions/productAction";

// const RecommendedCard = ({ id }) => {
//   //   console.log(id);
//   const ids = id.split(".")[0].replace("rupsa image\\", "");
//   const dispatch = useDispatch();
//   //   dispatch(getProductDetails(ids));
//   //   const { product, loading, error } = useSelector(
//   //     (state) => state.productDetails
//   //   );
//   //   const options = {
//   //     value: product.ratings,
//   //     readOnly: true,
//   //     precision: 0.5,
//   //   };

//   //   useEffect(() => {
//   //     dispatch(getProductDetails(ids));
//   //   }, [dispatch, ids]);

//   const fetchProductDetails = useMemo(() => {
//     return () => {
//       // const ids = id.split(".")[0].replace("rupsa image\\", "");
//       dispatch(getProductDetails1(ids));
//     };
//   }, [dispatch, id]);

//   // Effect to fetch product details when component mounts or id changes
//   useEffect(() => {
//     fetchProductDetails();
//   }, [fetchProductDetails]);

//   // useEffect(() => {
//   //   const fetchProductDetails = () => {
//   //     dispatch(getProductDetails1(ids));
//   //   };
//   //   fetchProductDetails();
//   // }, [dispatch, id]);

//   const { product } = useSelector((state) => state.product1);

//   return (
//     <Link className="productCard" to={`/product/${ids}`}>
//       <h1>similar product</h1>

//       <Card>
//         <CardMedia
//           component="img"
//           height="150"
//           image={product.images[0].url}
//           alt={product.name}
//         />
//         <CardContent>
//           <Typography variant="h6" gutterBottom>
//             {product.name}
//           </Typography>
//           <div style={{ display: "flex", alignItems: "center" }}>
//             <span className="productCardSpan">
//               {" "}
//               ({product.numOfReviews} Reviews)
//             </span>
//           </div>
//           <Typography variant="h6" color="textSecondary">
//             ₹{product.price}
//           </Typography>
//         </CardContent>
//       </Card>
//     </Link>
//   );
// };

// export default RecommendedCard;
