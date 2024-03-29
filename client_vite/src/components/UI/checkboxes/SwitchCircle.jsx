// @ts-nocheck
import React , {useState } from 'react';

import css from "./switchCircle.module.css";

import {connectMetamask} from './utils';
import { memo } from 'react';
import { useDispatch } from 'react-redux';


function connectWalet(dispatch,setSwitchOn=null)
{
  if(!window.ethereum)
  {
    //console.warn('No web3 detected or metamask! Falling back to http://localhost:8545.');
    console.log('You are using other wallet');
  }
  else
  {
    if(window.ethereum.isMetaMask)
      connectMetamask(dispatch,setSwitchOn);
    else
      console.log('Please install MetaMask!'); 
  }
}


const SwitchCircle = () => 
{
  const dispatch = useDispatch();
  const [connectedWallet,setConnectedWallet] = useState(false);

  connectWalet(dispatch,setConnectedWallet);

  return (
    <div className='d-flex'>
        <div className={css.navigationPanel_header__switch + ' mt-2 ml-2'}>
            <input type="checkbox" id="switch__buttonThree"  checked={connectedWallet} disabled={connectedWallet}  readOnly/>
            <label onClick={() => connectWalet(dispatch,setConnectedWallet)}><i></i>
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
