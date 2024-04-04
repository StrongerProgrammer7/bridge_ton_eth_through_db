// @ts-nocheck

import React, { useState } from 'react'
import { memo } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';

import { signIn } from './utils';

const PopupSignIn = (props) => 
{
    const [password, setPassword] = useState('+JwfM8b^BC*jIK');
    const dispatch = useDispatch();

    return (
        <Modal show={ props.show } onHide={ props.handleClose }>
            <Modal.Header closeButton>
                <Modal.Title>{ props.titleModal }</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Аккаунт</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="meta"
                            defaultValue={ props.wallet }
                            disabled
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlTextarea1"
                    >
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control
                            type="password"
                            onChange={ e => setPassword(e.target.value) }
                            autoComplete='true'
                            defaultValue={ "+JwfM8b^BC*jIK" }
                            autoFocus
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Check
                            type='checkbox'
                            disabled={ !props.isDoctor }
                            label={ 'Войти как врач' } />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={ props.handleClose }>
                    Закрыть
                </Button>
                <Button variant="primary" onClick={ e => 
                {
                    console.log(password);
                    signIn({ meta: props.wallet, pass: password, isDoctor: props.isDoctor }, dispatch);
                    props.handleClose(false);
                } }>
                    Войти
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default memo(PopupSignIn)
