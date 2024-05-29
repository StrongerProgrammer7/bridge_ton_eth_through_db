// @ts-nocheck
import React, { useState, useEffect } from 'react';
import css from "./switchCircle.module.css";
const SwitchCircle = ({ depend }) => 
{
  const [connectedWallet, setConnectedWallet] = useState(false);

  useEffect(() =>
  {
    if (!depend)
      setConnectedWallet(false);
    else
      setConnectedWallet(true);
  }, [depend])

  return (
    <div className='d-flex gap-2'>
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

export default SwitchCircle;
