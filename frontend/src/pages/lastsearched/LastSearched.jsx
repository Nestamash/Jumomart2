import React from 'react'

const LastSearched = () => {
    const viewed = [
        {
            url:'/images/tv3.jpg',
            title:'Sonar C7 Hot And Normal',
            price:'Ksh '+500
    },
     {
            url:'/images/smart7.jpg',
            title:'Freeyond Pods1 Earphones BT5.3 ENC Earbuds',
            price:'Ksh '+1190
    },
    {
        url:'/images/skincare1.jpg',
        title:'Freeyond Pods1 Earphones BT5.3 ENC Earbuds',
        price:'Ksh '+1190
},
{
    url:'/images/shirt.jpg',
    title:'Freeyond Pods1 Earphones BT5.3 ENC Earbuds',
    price:'Ksh '+1190
},
{
    url:'/images/notepad.jpg',
    title:'Freeyond Pods1 Earphones BT5.3 ENC Earbuds',
    price:'Ksh '+1190
},
{
    url:'/images/kitchen.jpg',
    title:'Freeyond Pods1 Earphones BT5.3 ENC Earbuds',
    price:'Ksh '+1190
}
    ]
  return (
    <section className='lastviewed-container'>
        <div className='heading'>
            <h3>Last Searched</h3>
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

export default LastSearched