import { React, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../actions/productAction";
import RecommededProduct from "./RecommededProduct";

const RecommendedList = ({ id }) => {
  const [recommendations, setRecommendations] = useState([]);
  // const [image, setImages] = useState([]);
  // const [image, setImage] = useState(null);
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
    <div>
      {console.log(recommendations)}
      {/* <RecommededProduct id={recommendations[0]}/> */}
      {/* {console.log(id)} */}
      recommendedList
    </div>
  );
};

export default RecommendedList;
