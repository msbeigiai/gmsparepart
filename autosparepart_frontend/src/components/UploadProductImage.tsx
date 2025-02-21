import { API_BASE_URL } from "@/types";
import axios from "axios";
import { useState } from "react";

const UploadProductImage = () => {
  const [images, setImages] = useState([]);
  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files)); // Allow multiple file selection
  };

  const handleUpload = async () => {
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append("files", image); // Append each file to the form data
    });

    try {
      const response = await axios.post(
        `${API_BASE_URL}/products/a111e7c8-b3b5-4b1d-84cf-98765ff00101/upload-images`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Images uploaded successfully:", response.data);

      // Optionally, save the product with the image URLs
      const productResponse = await axios.post("/api/products", {
        name: "Sample Product",
        description: "This is a sample product.",
        imageUrls: response.data, // Use the Cloudinary URLs
      });
      console.log("Product created successfully:", productResponse.data);
    } catch (error) {
      console.error("Error uploading images or creating product:", error);
    }
  };

  return (
    <div className="bg-slate-200 w-full p-3">
      <h3>Upload Product Images</h3>
      <input
        title="upload-product"
        type="file"
        multiple
        onChange={handleImageChange}
      />
      <button onClick={handleUpload} disabled={images.length === 0}>
        Upload
      </button>
    </div>
  );
};

export default UploadProductImage;
