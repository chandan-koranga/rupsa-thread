import { React, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../actions/productAction";
import RecommededProduct from "./RecommededProduct";
import RecommendedCard from "./RecommendedCard";
import "./RecommendedList.css";

const RecommendedList = ({ id }) => {
  const [recommendations, setRecommendations] = useState([]);
  // const [image, setImages] = useState([]);
  // const [image, setImage] = useState(null);
  const handleProductClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    const handleImageUpload = async () => {
      try {
        const imageUrl = id;
        // "https://res.cloudinary.com/db8gxutvi/image/upload/v1709488542/products/ijmvrc6ifgpxpm6vxuad.jpg";

        const formData = new FormData();
        formData.append("image", imageUrl);

        const response = await axios.post(
          "http://127.0.0.1:5000/get_recommendations",
          formData
        );

        if (response.status !== 200) {
          throw new Error("Failed to get recommendations");
        }
        const recommendations = await response.data.recommendations;
        setRecommendations(recommendations);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        setRecommendations([]);
      }
    };

    handleImageUpload();
  }, [id]);

  return (
    <div className="container">
      {recommendations.length > 0 &&
        recommendations.map((recommendation, index) => (
          <div key={index} onClick={handleProductClick}>
            <RecommendedCard key={index} id={recommendation} />
          </div>
        ))}
    </div>
  );
};

export default RecommendedList;

// Lazy loading
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import RecommendedCard from "./RecommendedCard";
// import LoadingSpinner from "./LoadingSpinner"; // You need to implement LoadingSpinner component

// const RecommendedList = ({ id }) => {
//   const [recommendations, setRecommendations] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchRecommendations = async () => {
//       try {
//         const formData = new FormData();
//         formData.append("image", id);

//         const response = await axios.post(
//           "http://127.0.0.1:5000/get_recommendations",
//           formData
//         );

//         if (response.status !== 200) {
//           throw new Error("Failed to get recommendations");
//         }

//         const recommendations = response.data.recommendations;
//         setRecommendations(recommendations);
//       } catch (error) {
//         console.error("Error fetching recommendations:", error);
//         setError("Failed to fetch recommendations");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRecommendations();
//   }, [id]);

//   if (loading) {
//     return <LoadingSpinner />;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       {recommendations.map((recommendation, index) => (
//         <RecommendedCard key={index} id={recommendation} />
//       ))}
//     </div>
//   );
// };

// export default RecommendedList;
