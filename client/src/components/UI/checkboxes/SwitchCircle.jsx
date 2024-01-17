// @ts-nocheck
import React , {useState, useContext} from 'react';

import css from "./switchCircle.module.css";
import { Context } from "../../../App";
import {connectMetamask} from './utils';
import { memo } from 'react';


function connectWalet(user,setIsRegistered,setSwitchOn=null,setName=null)
{
  if(!window.ethereum)
  {
    //console.warn('No web3 detected or metamask! Falling back to http://localhost:8545.');
    console.log('You are using other wallet');
  }
  else
  {
    if(window.ethereum.isMetaMask)
      connectMetamask(user,setIsRegistered,setSwitchOn,setName);
    else
      console.log('Please install MetaMask!'); 
  }
}


const SwitchCircle = () => 
{
  const [connectedWallet,setSwitchOn] = useState(false);
  const {setIsRegistered,user,setName} = useContext(Context);
  connectWalet(user,setIsRegistered,setSwitchOn,setName);

  return (
    <div className='d-flex'>
        <div className={css.navigationPanel_header__switch + ' mt-2 ml-2'}>
            <input type="checkbox" id="switch__buttonThree"  checked={connectedWallet} disabled={connectedWallet}  readOnly/>
            <label onClick={() => connectWalet(user,setIsRegistered,setSwitchOn,setName)}><i></i>
            </label>           
        </div>
        <label className={css.displayNone}>
            <input type="checkbox" id="navigationPanel-header__input" readOnly/>
            <span></span>
        </label>
    </div>
  )
}

export default memo(SwitchCircle);
