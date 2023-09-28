import React, { useState } from 'react'
import { collection, addDoc } from "firebase/firestore"; 
import { ref,uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from '../../firestore';
import { db } from '../../firestore';
import NavBar from '../../layouts/navbar/NavBar';
import './addproducts.scss'
const AddProducts = () => {
    const [category, setCategory] = useState('')
    const [brand, setBrand] = useState('')
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [imageUrl, setImageUrl] = useState(null)
    const [price, setPrice] = useState('')
    const [previousPrice, setPreviousPrice] = useState('')
    const [rating, setRating] = useState('')
    const [specification, setSpecification] = useState('')


    console.log(category)
    const handleSubmit = (e)=>{
        e.preventDefault()
    }
    const handleImageChange = (e)=>{
      if(e.target.files[0]){
        setImage(e.target.files[0])
      }

    }
   
    const addProduct = async()=>{
      const storageRef = ref(storage, title);
      uploadBytes(storageRef, image).then(() => {
        getDownloadURL(storageRef)
        .then((url) => {
          setImageUrl(url)
        
          
          // console.log(url)
  
        })
        .catch((error) => {
          switch (error.code) {
            case 'storage/object-not-found':
              console.log('File doesn\'t exist') 
              break;
            case 'storage/unauthorized':
              console.log('User \'t have permission to access the object')
              break;
            case 'storage/canceled':
              console.log('User canceled the upload')
              break;
      
            // ...
      
            case 'storage/unknown':
              console.log('Unknown error occurred, inspect the server response') 
              break;
          }
        });
      });


        // Add a new document in collection "cities"

          if(imageUrl !==null){

          const docRef = await addDoc(collection(db, "products"), {
            
            p_id: Math.floor(Math.random()*10000),
            brand: brand,
            category: category,
            image_url: imageUrl,
            previousPrice: previousPrice,
            price: price,
            ratings: rating,
            specification: specification,
            title:title
        });
      }

      
        
       
        // console.log("Document written with ID: ", docRef.id);
    }

  return (
    <>
    <NavBar />
    <div className='add-products-wrapper'>
        <h1>Add new products</h1>
        <form onSubmit={handleSubmit}>
            <input type='text' onChange={(e)=>setCategory(e.target.value)} placeholder='Category' required/>
            <input type='text' onChange={(e)=>setBrand(e.target.value)} placeholder='Brand' required />
            <input type='text' onChange={(e)=>setTitle(e.target.value)} placeholder='Product title' required />
            <input type='text' onChange={(e)=>setPrice(e.target.value)} placeholder='Price' required/>
            <input type='text' onChange={(e)=>setPreviousPrice(e.target.value)} placeholder='Previouse price' required />
            <input type='text' onChange={(e)=>setRating(e.target.value)} placeholder='Product ratings' required/>
            <input type='text' onChange={(e)=>setSpecification(e.target.value)} placeholder='Product specification' required />
            <input type='file' onChange={handleImageChange} required />
            <button onClick={addProduct}>Add</button>
        </form>
    </div>
    </>
  )
}

export default AddProducts