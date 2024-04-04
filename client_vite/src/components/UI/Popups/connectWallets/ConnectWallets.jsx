// @ts-nocheck
import { TonConnectButton } from '@tonconnect/ui-react';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useTonConnect } from '../../../../hooks/useTonConnect';
import useTonContract from '../../../../hooks/useTonContract';
import { UserControls } from '../../../../models/user';
import { keyLocalStorage, NameWallet } from '../../../../store/enums/WorkWithWallet';
import css from "./connectwallet.module.css";
import metamask from "./images/MetaMask_Fox.svg.png";
import { connectMetamask, disconnectMetatmask, isExistsPatientOrDoctor, disconnectWallet } from './utils';


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
    const userAccounntWallet = useSelector((state) => state.userReducer.accountWallet);
    const userNameWallet = useSelector((state) => state.userReducer.personalInfo.nameWallet);
    const dispatch = useDispatch();
    const { network, wallet, connected } = useTonConnect();
    const contract = useTonContract();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const connectMetamask = () =>
    {
        if (userNameWallet === NameWallet.TON)
        {
            console.log("Using only one wallet! disalbe ton wallet");
            return;
        }
        if (!userNameWallet)
        {
            handleClose();
            connectWalet(dispatch);
        } else
        {
            if (window.ethereum.isMetaMask)
                disconnectMetatmask();
            disconnectWallet(dispatch);


        }

    }

    useEffect(() =>
    {
        console.log("try connect with ton", connected);
        if (!connected)
        {
            if (userAccounntWallet)
                disconnectWallet(dispatch);
            return;
        }
        dispatch(UserControls.setAccountWallet(wallet));
        dispatch(UserControls.setNameWallet(NameWallet.TON));

    }, [connected, network, wallet]);

    useEffect(() =>
    {
        console.log("try connect contract TON", contract);
        if (!contract.contract_patients)
            return;
        dispatch(UserControls.setContract(contract.contract_patients));
        isExistsPatientOrDoctor(dispatch, wallet);
    }, [contract.contract_patients]);
    return (
        <>
            <Button variant="light" onClick={ handleShow }>
                Connect wallets
            </Button>

            <Modal show={ show } onHide={ handleClose } className={ css.zindex1 }>
                <Modal.Header closeButton>
                    <Modal.Title>Choose Wallet</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={ css.connect_wallet }>
                        <div onClick={ connectMetamask } className={ css.connect_metamask }>
                            <div>
                                <img src={ metamask } alt="metamask" />
                            </div>
                            <p className={ css.text_metamask }> { userNameWallet === NameWallet.ETH ? "Disconnect " : "Connect with " } metamask</p>
                        </div>
                        <div>
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

