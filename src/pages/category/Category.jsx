import React from 'react'
import { NavLink } from 'react-router-dom'
import './category.scss'
const Category = () => {

  const images = [
    { url:"images/live.gif",
      text:"",
      alt:"live"
    },
    { url:"images/small.jpg",
      text:"Small Appliances",
      alt:"appliances"
    },
    { url:"images/tv3.jpg",
      text:"Television",
      alt:"television"
    },
    { url:"images/phone.jpg",
    text:"Smartphones",
    alt:"smartphones"
   },
   { url:"images/fridge.jpg",
   text:"Fridges",
   alt:"fridge"
   },
    { url:"images/audio.jpg",
    text:"Home Audio",
    alt:"homeaudio"
    },
    { url:"images/clearance.gif",
    text:"",
    alt:"clearance"
    },
    { url:"images/suit.jpg",
    text:"Men Fashion",
    alt:"menfashion"
    },
    { url:"images/kitchen.jpg",
    text:"Kitchen & Dining",
    alt:"kitchen"
    },
    { url:"images/skincare1.jpg",
    text:"Facial Skincare",
    alt:"facial"
    },
    { url:"images/dress2.jpg",
    text:"Women Fashion",
    alt:"dress"
    },
    { url:"images/laptop.jpg",
    text:"Laptops",
    alt:"laptop"
    }

  ]
  const scrollLeft = ()=>{
    document.getElementById("slider").scrollLeft -= 900;
  }
  const scrollRight = ()=>{
    document.getElementById("slider").scrollLeft += 900;
  }
  return (
    <section>
     <button className='scroll-btn' onClick={scrollLeft} ><i className="fa-solid fa-chevron-left"></i></button>
      <div className='slider' id='slider'>
      {
        images.map((image, i)=>{
          return(
            
                <article key={i}>
                  <figure>
                  <NavLink to={'/products-preview'} end >
                    <img src={image.url} alt={image.alt} /> 
                    </NavLink>
                  </figure>
                  <figcaption>
                    <p>{image.text}</p>
                  </figcaption>
                </article>            
          );
        })
      }
      </div>
      <button className='scroll-btn' onClick={scrollRight} ><i className="fa-solid fa-chevron-right"></i></button>
    </section>
  )
}

export default Category