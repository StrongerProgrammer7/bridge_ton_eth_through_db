// @ts-nocheck
import React, { useState } from 'react';

import css from "./switchCircle.module.css";

import { connectMetamask } from './utils';
import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { useEthConnectAccount } from '../../../hooks/useEthConnect';
import { useEthContractConnect } from '../../../hooks/useEthContractConnect';
import { useEffect } from 'react';
import { UserControls } from '../../../models/user';

function connectWalet(ethData, dispatch, setSwitchOn = null)
{
  if (!window.ethereum)
  {
    //console.warn('No web3 detected or metamask! Falling back to http://localhost:8545.');
    console.log('You are using other wallet');
    return true;
  }
  else
  {
    if (window.ethereum.isMetaMask)
      connectMetamask(ethData, dispatch, setSwitchOn);
    else
      console.log('Please install MetaMask!');
    return false;
  }
}


const SwitchCircle = () => 
{
  const dispatch = useDispatch();
  const { web3, account } = useEthConnectAccount();
  const contract = useEthContractConnect(web3);
  const [connectedWallet, setConnectedWallet] = useState(false);

  useEffect(() =>
  {
    console.log("try connect web3 and get account", account);
    if (!web3 || account === '')
      return;
    dispatch(UserControls.setAccountWallet(account));
    dispatch(UserControls.setWeb3Connect(web3));
  }, [web3, account]);

  useEffect(() =>
  {
    console.log("try connect with contract eth", contract);
    if (!contract)
      return;
    dispatch(UserControls.setContract(contract));
    dispatch(UserControls.setNameWallet('ETH'));
    connectWalet({ web3, account }, dispatch, setConnectedWallet);
  }, [contract]);

  return (
    <div className='d-flex'>
      <div className={ css.navigationPanel_header__switch + ' mt-2 ml-2' }>
        <input type="checkbox" id="switch__buttonThree" checked={ connectedWallet } disabled={ connectedWallet } readOnly />
        <label onClick={ () => connectWalet({ web3, account }, dispatch, setConnectedWallet) }><i></i>
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
