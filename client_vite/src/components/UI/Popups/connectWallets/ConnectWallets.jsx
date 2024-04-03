// @ts-nocheck
import { useTonConnect } from '../../../../hooks/useTonConnect';
import { CHAIN, TonConnectButton } from '@tonconnect/ui-react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import metamask from "./images/MetaMask_Fox.svg.png";
import css from "./connectwallet.module.css";
import { connectMetamask } from './utils';
import { UserControls } from '../../../../models/user';
import useTonContract from '../../../../hooks/useTonContract';
import { NameWallet } from '../../../../store/enums/ActionTypes';


function connectWalet(dispatch)
{
    if (!window.ethereum || !window.ethereum.isMetaMask)
    {
        console.warn('You are using other wallet or don"t install MetaMask!');
        return;
    }
    connectMetamask(dispatch);
}
const ConnectWallets = () => 
{
    const dispatch = useDispatch();
    const { network, wallet, connected } = useTonConnect();
    const contract = useTonContract();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const connectMetamask = () =>
    {
        handleClose();
        connectWalet(dispatch)
    }

    useEffect(() =>
    {
        console.log("try connect with ton", connected);
        if (!connected)
            return;
        dispatch(UserControls.setAccountWallet(wallet));
        dispatch(UserControls.setNameWallet(NameWallet.TON));

    }, [connected, network, wallet]);

    useEffect(() =>
    {
        console.log("try connect contract TON", contract);
        if (!contract.contract_patients)
            return;
        dispatch(UserControls.setContract(contract.contract_patients));
    }, [contract.contract_patients]);
    return (
        <>
            <Button variant="light" onClick={ handleShow }>
                Connect wallets
            </Button>

            <Modal show={ show } onHide={ handleClose }>
                <Modal.Header closeButton>
                    <Modal.Title>Choose Wallet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={ css.connect_wallet }>
                        <div onClick={ connectMetamask } className={ css.connect_metamask }>
                            <div>
                                <img src={ metamask } alt="metamask" />
                            </div>
                            <p className={ css.text_metamask }> Connect with metamask</p>
                        </div>
                        <div onClick={ handleClose }>
                            <TonConnectButton />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={ handleClose }>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ConnectWallets;

