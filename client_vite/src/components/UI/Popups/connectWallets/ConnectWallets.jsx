// @ts-nocheck
import { TonConnectButton } from '@tonconnect/ui-react';
import React, { useEffect, useState, memo } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useTonConnect } from '../../../../hooks/useTonConnect';
import useTonContract from '../../../../hooks/useTonContract';
import { UserControls } from '../../../../models/user';
import { NameWallet } from '../../../../store/enums/WorkWithWallet';
import css from "./connectwallet.module.css";
import metamask from "./images/MetaMask_Fox.svg.png";
import { connectMetamask, disconnectMetatmask, isExistsPatientOrDoctor, disconnectWallet } from './utils';


const ConnectWallets = () => 
{
    const userAccounntWallet = useSelector((state) => state.userReducer.accountWallet);
    const userContract = useSelector((state) => state.userReducer.contract);
    const userNameWallet = useSelector((state) => state.userReducer.personalInfo.nameWallet);
    const dispatch = useDispatch();
    const { wallet, connected } = useTonConnect();
    const contract = useTonContract();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const connectWalletMetamask = () =>
    {
        if (userNameWallet === NameWallet.TON)
        {
            console.log("Using only one wallet! disalbe ton wallet");
            return;
        }
        if (!window.ethereum || !window.ethereum.isMetaMask)
        {
            console.warn('You are using other wallet or don"t install MetaMask!');
            return;
        }
        if (!userAccounntWallet || !userContract)
        {
            handleClose();
            connectMetamask(dispatch);
        }
    }

    const disconnectWalletMetamask = () =>
    {
        if (window.ethereum.isMetaMask && userAccounntWallet)
            disconnectMetatmask();
        disconnectWallet(dispatch);
    }


    useEffect(() =>
    {
        const disconnectWalletTon = (event) =>
        {
            // console.log(event.target, event.target.tagName, event.target.textContent);
            if (event.target.textContent.trim() === "Disconnect")
            {
                const maxParent = 5;
                let parentElem = event.target;
                for (let i = 0; i < maxParent; i++)
                {
                    parentElem = parentElem.parentNode;
                    if (parentElem.tagName === 'TC-ROOT')
                        break;
                }
                // console.log(event.target.textContent.trim() === "Disconnect", parentElem)
                if (parentElem.tagName === 'TC-ROOT')
                {
                    console.log("Ton disconnect ", userNameWallet);
                    if (userNameWallet !== NameWallet.ETH)
                        disconnectWallet(dispatch);
                }
            }
        }

        document.addEventListener("click", disconnectWalletTon);
        return () =>
        {
            document.removeEventListener("click", disconnectWalletTon);
        };
    }, []);

    useEffect(() =>
    {
        if (userNameWallet === NameWallet.ETH)
            connectWalletMetamask();
    }, [userNameWallet])

    useEffect(() =>
    {
        console.log("try connect with ton", connected);
        if (!connected || !contract.contract_patients)
            return;

        dispatch(UserControls.setAccountWallet(wallet));
        dispatch(UserControls.setNameWallet(NameWallet.TON));
        dispatch(UserControls.setContract(contract.contract_patients));
        isExistsPatientOrDoctor(dispatch, wallet);

    }, [connected, contract.contract_patients, wallet]);

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
                        <div onClick={ !userAccounntWallet || !userContract ? connectWalletMetamask : disconnectWalletMetamask } className={ css.connect_metamask }>
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

export default memo(ConnectWallets);

