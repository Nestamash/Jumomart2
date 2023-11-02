import React from 'react'
import './lastviewed.scss'
const Lastviewed = () => {
    const viewed = [
        {
            url:'/images/suit.jpg',
            title:'Sonar C7 Hot And Normal',
            price:'Ksh '+500
    },
     {
            url:'/images/freeyond.jpg',
            title:'Freeyond Pods1 Earphones BT5.3 ENC Earbuds',
            price:'Ksh '+1190
    },
    {
        url:'/images/tv.jpg',
        title:'Freeyond Pods1 Earphones BT5.3 ENC Earbuds',
        price:'Ksh '+1190
},
{
    url:'/images/shoe.jpg',
    title:'Freeyond Pods1 Earphones BT5.3 ENC Earbuds',
    price:'Ksh '+1190
},
{
    url:'/images/xiomi.jpg',
    title:'Freeyond Pods1 Earphones BT5.3 ENC Earbuds',
    price:'Ksh '+1190
},
{
    url:'/images/panties.jpg',
    title:'Freeyond Pods1 Earphones BT5.3 ENC Earbuds',
    price:'Ksh '+1190
}
    ]
  return (
    <section className='lastviewed-container'>
        <div className='heading'>
            <h3>Last Viewed</h3>
            <a href='#'>SEE ALL
            <i className="fa-solid fa-chevron-right"></i>
            </a>
        </div>
        <div className='product-wrapper'>
            {
                viewed.map(view=>{
                    return(
                        <div className='card-wrapper'>
                <figure>
                    <img src={view.url} alt='/' />
                </figure>
                <div className='product-title'>
                    <p>{view.title}</p>
                    <h1>{view.price}</h1>
                </div>
            </div>
                    )
                })
            }
            
        </div>
    </section>
  )
}

export default Lastviewed