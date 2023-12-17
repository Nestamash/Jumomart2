import React, { useState, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firestore';
import { db } from '../../firestore';
import NavBar from '../../layouts/navbar/NavBar';
import './addproducts.scss';

const AddProducts = () => {
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [previousPrice, setPreviousPrice] = useState('');
  const [rating, setRating] = useState('');
  const [specification, setSpecification] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categoryOptions = ["Small Appliances", "Television", "Smartphones", "Fridges", "Home Audio", "Men Fashion", "Woman Fashion", "Facial Skincare", "Laptops", "Kitchen & Dining", "Phones", "Appliances","Health & Beauty","Home & Office", "Fashion", "Supermarket","Baby Products", "Computing", "Sporting Goods"];

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setError('');
      setSuccessMessage('');
    }, 4000);

    return () => clearTimeout(timeoutId);
  }, [error, successMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const addProduct = async () => {
    try {
      setLoading(true);

      // Check for empty required fields
      if (!category || !brand || !title || !image || !price || !previousPrice || !rating || !specification) {
        setError('Please fill in all required fields');
        return;
      }

      const storageRef = ref(storage, title);
      await uploadBytes(storageRef, image);

      const url = await getDownloadURL(storageRef);
      setSuccessMessage('Product added successfully!');

      const docRef = await addDoc(collection(db, 'products'), {
        p_id: Math.floor(Math.random() * 10000),
        brand: brand,
        category: category,
        image_url: url,
        previousPrice: previousPrice,
        price: price,
        ratings: rating,
        specification: specification,
        title: title,
      });

      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding product:', error);
      setError('Error adding product. Please try again.');
      setSuccessMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="add-products-wrapper">
        <h1>Add new products</h1>
        <form onSubmit={handleSubmit}>
          {/* <input
            type="text"
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Category"
            required
          /> */}

<label htmlFor="category">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>Select a category</option>
            {categoryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>



          <input
            type="text"
            onChange={(e) => setBrand(e.target.value)}
            placeholder="Brand"
            required
          />
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Product title"
            required
          />
          <input
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            required
          />
          <input
            type="number"
            onChange={(e) => setPreviousPrice(e.target.value)}
            placeholder="Previous price"
            required
          />
          <input
            type="number"
            onChange={(e) => setRating(e.target.value)}
            placeholder="Product ratings"
            required
          />
          <input
            type="text"
            onChange={(e) => setSpecification(e.target.value)}
            placeholder="Product specification"
            required
          />
          <input type="file" onChange={handleImageChange} required />
          <button type="button" onClick={loading ? null : addProduct} disabled={loading}>
            {loading ? 'Adding.' : 'Add'}
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </>
  );
};

export default AddProducts;
