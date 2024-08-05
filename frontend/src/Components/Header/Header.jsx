import React, { useEffect, useState } from 'react'
import './Header.css'
import { sale_banners } from '../../assets/asset'
const Header = () => {
    const [Locate, setLocate] = useState(0)
    const bannerHandler = (val) => {
        let length = sale_banners.length - 1
        
        setLocate((prev)=>{
            if (prev + val > length) {
                return 0
            } else if(prev + val <0) {
                return length
            }else{
            return prev + val
            }
        })
    }


    useEffect(() => {
        const interval = setInterval(() => {
            bannerHandler(1)
        }, 4000);

        return () => clearInterval(interval);
    }, [])

    return (
        <div className='trending'>
            <div className="trending-banner-container">
                <div className="trending-banner">
                    {sale_banners.map((item, index) => {
                        return (
                             index === Locate ?
                                    <div key={index}  className="banner">
                                        <img className='sale' src={item.sale_image} alt="" />
                                        <div className="buttons">
                                            <button onClick={()=>{bannerHandler(-1)}} id="prev">{'<'}</button>
                                            <button onClick={() => { bannerHandler(1) }} id="next">{'>'}</button>
                                        </div>
                                    </div>
                                : ''
                    )
                    })}
                </div>

                <ul className="dots">
                    {
                        sale_banners.map((item,index)=>{
                            return(
                                index==Locate ? <li className='active'></li> : <li></li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Header