import { useEffect, useState } from "react"
import './imageSlider.scss'
function ImageSlider({images}){
    
    const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(()=>{
    const interveal = setInterval(nextImage, 3000)
    return ()=>clearInterval(interveal)
  })
 
    const previouseImage = ()=>{
        const isFirstImage = currentIndex ===0;
        const newIndex = isFirstImage ? images.length -1 : currentIndex-1;
        setCurrentIndex(newIndex);
    }
    const nextImage = ()=>{
        const lastImage = currentIndex === images.length -1;
        const newIndex = lastImage ? 0 : currentIndex +1;
        setCurrentIndex(newIndex);
    }
    const goToImage = (index)=>{
        setCurrentIndex(index);
    }
    return <div className="container">
        <img src={images[currentIndex].url}></img>
        <div className="buttons">
            <button className="slide-btn" onClick={previouseImage} ><i className="fa-solid fa-chevron-left"></i></button>
            <button className="slide-btn" onClick={nextImage}><i className="fa-solid fa-chevron-right"></i></button>     
        </div>
        <div className="circles">
            {
                images.map((image, index)=>{
                    return (
                        <i className={currentIndex ===index?"fa-solid fa-circle active":"fa-solid fa-circle"} onClick={()=>{goToImage(index)}}></i>
                    );
                })
            }
        </div>
    </div>
}
export default ImageSlider