import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RecommendationComponent = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState(null);

  // const dispatch = useDispatch();
  // const navigate=useNavigate();
  // const { errors, products } = useSelector((state) => state.products);

  //call products
  // select on bases of id

  const handleImageUpload = async (event) => {
    try {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(
        "http://127.0.0.1:5000/get_recommendations",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get recommendations");
      }

      const data = await response.json();
      setRecommendations(data.recommendations);
      setError(null);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setError("Error fetching recommendations");
      setRecommendations([]);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} accept="image/*" />
      {error && <p>{error}</p>}
      <h2>Recommended Files</h2>
      {console.log(recommendations)}
      <ul>
        {recommendations.map((file, index) => (
          <li key={index}>{file}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendationComponent;
