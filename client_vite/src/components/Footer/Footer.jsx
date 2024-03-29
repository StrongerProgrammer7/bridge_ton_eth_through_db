// @ts-nocheck
import React from 'react'
import css from './footer.module.css';

import facebook from './image/facebook_icon.png';
import vk from './image/vk_icon.png';
import mail from './image/gmail_icon.png';
import twitter from './image/twitter_icon.png';
const Footer = () => 
{

  return (
    <footer className={css.footer}>
        <div className={css.footer__inner}>
            <div className={css.footer__info}>
                <div className={css.footer__copyright}>
                    &copy; 2023 - Abduykov Zufar
                </div>
                <div className={css.footer__social_icon}>
                    <a href="https://vk.com/specialsoldiers" id="">
                        <img src={vk} alt="" />
                    </a>
                    <a href="https://www.facebook.com/">
                        <img src={facebook} alt=""/>
                    </a>
                    <a href="#!">
                        <img src={twitter} alt=""/>
                    </a>
                    <a href="mailto:swat55551@gmail.com" className={css.gmail}>
                        <img src={mail} alt="" />
                    </a>
                </div>
            </div>
            
            <div className={css.footer__text}>
                <a href="#!">Copyright &copy;2023 All rights reserved</a> 
            </div>
        </div>
    </footer>
  )
}

export default Footer
