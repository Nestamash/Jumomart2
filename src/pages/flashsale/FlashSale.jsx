import React from 'react'
import './flashsale.scss'
const FlashSale = () => {
    const viewed = [
        {
            url:'/images/phone.jpg',
            title:'Sonar C7 Hot And Normal',
            price:'Ksh '+500
    },
     {
            url:'/images/handbag.jpg',
            title:'Freeyond Pods1 Earphones BT5.3 ENC Earbuds',
            price:'Ksh '+1190
    },
    {
        url:'/images/fridge.jpg',
        title:'Freeyond Pods1 Earphones BT5.3 ENC Earbuds',
        price:'Ksh '+1190
},
{
    url:'/images/harddisk.jpg',
    title:'Freeyond Pods1 Earphones BT5.3 ENC Earbuds',
    price:'Ksh '+1190
},
{
    url:'/images/audio.jpg',
    title:'Freeyond Pods1 Earphones BT5.3 ENC Earbuds',
    price:'Ksh '+1190
},
{
    url:'/images/dress2.jpg',
    title:'Freeyond Pods1 Earphones BT5.3 ENC Earbuds',
    price:'Ksh '+1190
}
    ]
  return (
    <section className='lastviewed-container'>
        <div className='heading flash'>
            <h3><i className="fa-solid fa-bolt-lightning"></i>Flash Sales</h3>
            <p>Time Left: 04h:27m:57s</p>
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

export default FlashSale