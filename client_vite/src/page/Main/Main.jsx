// @ts-nocheck

import React, {useState } from "react";
import Slider from "react-slick";

import blockchainBackgorund from './image/smallBlockchain.png';
import smallSmart from './image/smallSmart.png';
import smallIPFS from './image/smallIPFS.png';

import backBlockchainslider from './image/backBlockchainslider.png';
import backSmartContractsliderslider from './image/backSmartContractsliderslider.png';
import backIPFSslider from './image/backIPFSslider.png';


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Container from 'react-bootstrap/Container';
import css from './main.module.css';
const Main = () =>
{ 
    const [slider1, setSlider1] = useState(null);
    const [slider2, setSlider2] = useState(null);

    var settings = 
    {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false,
        fade: true,
    };
    var settingsSmalSlideer =
    {
        arrows:false,
        dots: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        pauseOnHover: true,
        
        mobileFirst:true,
        Infinity: true,
        speed: 2000,
        easing: 'ease',
        autoplay: true,
        autoplaySpeed: 7000,
    }

   

    return (
        <div className={css.information_about_site + ' pt-2'}>
            <Container className="wrapper-slider">
                <Slider 
                asNavFor={slider2}
                ref={(slider) => setSlider1(slider)}
                {...settings}>
                <div className={css.slider__item}>
                    <div className={css.about + ' ' + css.blockchain} id="about"> 
                    <Container>
                        <div className={css.blockchain__photo + ' ' + css.blockchain__aniamtion + ' clearfix'}>
                            <img className={css.smallPhoto} src={blockchainBackgorund} alt="img_blockchainBackgorund"/>
                        </div>           
                        <div className="d-flex justify-content-center">
                            <div className={css.about__content + ' ' + css.blockchain__content}>
                                <h3 className={css.about__title + ' ' + css.blockchain__title}>Blockchain</h3>
                                <div className={css.about__text}>
                                    <p>Блокчейн в здравоохранении, медицине и фармацевтике может использоваться для управления электронными медицинскими картами, цепочками поставок лекарств, для борьбы с контрафактом, контроля за распределением донорских органов, проведения клинических и биомедицинских исследований, удаленного мониторинга пациентов, улучшения процедур страхования и выставления счетов, а также анализа медицинских данных.</p>
                                </div>
                            </div>
                        </div>
                    </Container>
                    </div>
                </div>
                <div className={css.slider__item}>
                    <div className={css.about + ' ' + css.smartContract} id="smartContract"> 
                    <Container>
                        <div className={css.smartContract__photo + ' ' + css.smartContract__animation + ' clearfix'}>
                            <img className={css.smallPhoto} src={smallSmart} alt="img_smallSmart"/>
                        </div>           
                        <div className="d-flex justify-content-center">
                            <div className={css.about__content + ' ' + css.smartContract__content}>
                                <h3 className={css.about__title + ' ' + css.smartContract__title}>Интеллектуальный контракт</h3>
                                <div className={css.about__text}>
                                    <p>Этот компьютерный алгоритм, предназначенный для заключения и поддержания самоисполняемых контрактов, выполняемых в блокчейн-среде, избавляет пользователей от лишних посреднических действий на всех этапах заключения контракта.</p>
                                </div>
                            </div>
                        </div>
                    </Container>
                    </div>
                </div>
                <div className={css.slider__item}>
                    <div className={css.about + ' ' + css.ipfs} id="ipfs"> 
                    <Container>
                        <div className={css.ipfs__photo + ' ' + css.ipfs__animation + ' clearfix'}>
                            <img className={css.smallPhoto} src={smallIPFS} alt="img_smallIPFS"/>
                        </div>           
                        <div className="d-flex justify-content-center">
                            <div className={css.about__content + ' ' + css.ipfs__content}>
                                <h3 className={css.about__title + ' ' + css.ipfs__title}>IPFS контракт</h3>
                                <div className={css.about__text}>
                                    <p>IPFS была представлена в 2014 году Хуаном Бенетом как файловая система P2P с адресом контента и версиями. IPFS использует распределенную сеть для обеспечения эффективного средства передачи данных на большие расстояния, даже если это была межпланетная передача отсюда и название - Межпланетная файловая система (IPFS).</p>
                                </div>
                            </div>
                        </div>
                    </Container>
                    </div>
                </div>
                
                </Slider>
                <Slider 
                className={css.sliderSmall}
                asNavFor={slider1}
                focusOnSelect={true}
                ref={(slider) => setSlider2(slider)}
                {...settingsSmalSlideer}  id="sliderSmall">
                    <div className={css.sliderSmall__item}>
                        <img src={backBlockchainslider} width="35%" height="35%" alt="img_backBlockchainslider" />
                    </div>
                    <div className={css.sliderSmall__item}>
                        <img src={backSmartContractsliderslider} width="40%" height="40%" alt="img_backSmartContractsliderslider" />
                    </div>
                    <div className={css.sliderSmall__item}>
                        <img src={backIPFSslider} width="40%" height="40%" alt="img_backIPFSslider" />
                    </div>
                </Slider>
            </Container>
        </div>
    )
}



export default Main;