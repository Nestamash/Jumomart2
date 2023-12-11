import React, { useState, useEffect } from 'react';
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
},
{
    url:'/images/dress2.jpg',
    title:'Freeyond Pods1 Earphones BT5.3 ENC Earbuds',
    price:'Ksh '+1190
},
{
    url:'/images/dress2.jpg',
    title:'Freeyond Pods1 Earphones BT5.3 ENC Earbuds',
    price:'Ksh '+1190
},
{
    url:'/images/dress2.jpg',
    title:'Freeyond Pods1 Earphones BT5.3 ENC Earbuds',
    price:'Ksh '+1190
},
{
    url:'/images/dress2.jpg',
    title:'Freeyond Pods1 Earphones BT5.3 ENC Earbuds',
    price:'Ksh '+1190
}
    ]

    // Flash sale timer
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function calculateTimeLeft() {
    const endDate = new Date('2023-12-25T23:59:59'); // Set your flash sale end date here
    const now = new Date();
    const difference = endDate - now;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds };
    } else {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
  }

  const formatTime = (value) => (value < 10 ? `0${value}` : value);


    const scrollLeft = ()=>{
    document.getElementById("slider1").scrollLeft -= 900;
  }
  const scrollRight = ()=>{
    document.getElementById("slider1").scrollLeft += 900;
  }
  return (
    <section className='lastviewed-container'>
        <div className='heading flash'>
            <h3><i className="fa-solid fa-bolt-lightning"></i>Flash Sales</h3>
            <p>
            Time Left: {timeLeft.days}d :{formatTime(timeLeft.hours)}h:{formatTime(timeLeft.minutes)}m:{formatTime(timeLeft.seconds)}s
            </p>
            <a href='#'>SEE ALL
            <i className="fa-solid fa-chevron-right"></i>
            </a>
        </div>
        <div className='flashsale-container'>
        <button className='scroll-btn' onClick={scrollLeft} ><i className="fa-solid fa-chevron-left"></i></button>
        
        <div className='flashsale-product-wrapper' id='slider1'>
        
            {
                viewed.map((view, i)=>{
                    return(
                        <div key={i} className='flashsale-card-wrapper'>
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
        <button className='scroll-btn' onClick={scrollRight} ><i className="fa-solid fa-chevron-right"></i></button>
        </div>
    </section>
  )
}

export default FlashSale