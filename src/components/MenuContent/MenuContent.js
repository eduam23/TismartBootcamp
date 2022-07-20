import React from 'react';
import './MenuContent.css';
import AnalyticsIcon from '@mui/icons-material/Analytics';

function MenuContent({descripProduct = 'Cargando...', priceProduct = '0.00',categoryProduct = 'Cargando...'}) {
  return (
    <div className='menuContent'>
        <nav>
            <ul>
                <li>About</li>
                <li>Details</li>
                <li>Review</li>
                <li>Resources</li>
            </ul>
        </nav>

        <article>
            <header>
               <h3>About this product</h3>
               <div className='extraContent'>
                <span>Price: s/. {priceProduct}</span>
               <AnalyticsIcon className='analyticsIcon'/>
               <span>Intermediate</span>
               </div>
               
            </header>
            
            <p>{descripProduct}</p>
            <footer>
                <b>Category:</b> <i>{categoryProduct}</i>
            </footer>
        </article>
    </div>
  )
}

export default MenuContent