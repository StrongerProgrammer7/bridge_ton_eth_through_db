// @ts-nocheck
import React, { useState, useEffect, memo } from 'react';
import { useSelector } from 'react-redux';
import ConnectWallets from '../Popups/connectWallets/ConnectWallets';
import css from "./switchCircle.module.css";
const SwitchCircle = () => 
{
  const user = useSelector((state) => state.userReducer);
  const [connectedWallet, setConnectedWallet] = useState(false);

  useEffect(() =>
  {
    console.log("try connect with wallet");
    if (user.accountWallet === '')
      return;
    setConnectedWallet(true);
  }, [user.accountWallet])

  return (
    <div className='d-flex gap-2'>
      <ConnectWallets />
      <div className={ css.navigationPanel_header__switch + ' mt-2 ml-2' }>
        <input type="checkbox" id="switch__buttonThree" checked={ connectedWallet } disabled={ connectedWallet } readOnly />
        <label ><i></i>
        </label>
      </div>
      <label className={ css.displayNone }>
        <input type="checkbox" id="navigationPanel-header__input" disabled={ connectedWallet } readOnly />
        <span></span>
      </label>
    </div>
  )
}

export default memo(SwitchCircle);
