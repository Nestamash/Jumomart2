import React from 'react'
import './slideshowmobile.scss'
const slideshowMobile = ({images}) => {

      return (
        <section className='slide-mobile-wrapper'>
          <div className='slider'>
          {
            images.map(image=>{
              return(
                
                    <article className='mobile-slider'>
                      <figure>
                      <a href='#'>
                        <img src={image.url} alt={image.alt} />
                        </a>
                      </figure>
                    </article>   
              );
            })
          }
          </div>
        </section>
      )
}

export default slideshowMobile