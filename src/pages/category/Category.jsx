import React from 'react'
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
  const previouseImage = ()=>{
    console.log('worked')
  }
  return (
    <section>
      {/* <div className='btn-previous'>
      <button onClick={previouseImage} ><i className="fa-solid fa-chevron-left"></i></button>
      </div> */}
      
      {
        images.map(image=>{
          return(
                <article>
                  <figure>
                    <img src={image.url} alt={image.alt} />
                  </figure>
                  <figcaption>
                    <p>{image.text}</p>
                  </figcaption>
                </article>
          );
        })
      }
      {/* <div className='btn-next'></div> */}
    </section>
  )
}

export default Category