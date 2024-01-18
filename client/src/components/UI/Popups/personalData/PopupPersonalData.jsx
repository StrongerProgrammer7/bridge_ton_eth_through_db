// @ts-nocheck

import React,{memo,useContext} from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Context } from '../../../../App';
import { getPersonalInfo ,changeData} from "./utils";
import Spinner from 'react-bootstrap/Spinner';
import MyInput from '../../Inputs/MyInput';
import MySelect from '../../Selects/MySelect';

const PopupPersonalData = (props) => 
{
    const { user} = useContext(Context);
    const [isLoadingPersonalData,setLoadingPersonalData] = useState(true);
    const [personalInfo,setPersonalInfo] = useState(null);
    const [cities,setCities] = useState(null);
    const [categories,setCategories] = useState(null);
    const [contacts,setContacts] = useState(null);
    const [hospitals,setHospitals] = useState(null);
    const [professions,setProfessions] = useState(null);

   
    useEffect(()=>
    { 
        if(user && user.accountWallet === '') return;
        if(props.isSignIn === true) return;
        //console.log(user.accountWallet);
        getPersonalInfo(user.accountWallet,user,{setCategories,setCities,setContacts,setHospitals,setProfessions,setPersonalInfo});
        const idSet = setTimeout(()=>
        {
           //console.log(personalInfo);
            setLoadingPersonalData(false);
        },2500);
        return () =>
        {
            clearTimeout(idSet);
        };
    },[user,user.accountWallet,props.isSignIn])


    
  return (
    <Modal show={props.show} onHide={props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{props.titleModal}</Modal.Title>
          </Modal.Header>
          
            <Modal.Body>
            <Form>
              {
              isLoadingPersonalData === false ? 
              <>
               
               <MyInput
                labelText={'Имя'}
                type={'text'}
                object={personalInfo}
                _key={'name'}
                setChangeObject={setPersonalInfo}
                placeholderText='Имя'
                > </MyInput>
                <MyInput
                labelText={'Фамилия'}
                type={'text'}
                object={personalInfo}
                _key={'surname'}
                setChangeObject={setPersonalInfo}
                placeholderText='Фамилия'
                />
                <MyInput
                labelText={'Отчество'}
                type={'text'}
                object={personalInfo}
                _key={'lastname'}
                setChangeObject={setPersonalInfo}
                placeholderText='Отчество'
                ></MyInput>

                {
                  user.user.isDoctor === false ?
                  <>
                    <MySelect
                  labelText={'Адрес проживания'}
                  object={personalInfo}
                  _key={'addressResidence'}
                  elements={cities}
                  setObject={setPersonalInfo}
                  arrKey={['region','city']}
                  />                  
                  <MySelect
                  labelText={'Адрес  по прописке'}
                  object={personalInfo}
                  _key={'city'}
                  elements={cities}
                  setObject={setPersonalInfo}
                  arrKey={['region','city']}
                  />        
                  </>
                :
                <>
                <MySelect
                  labelText={'Категория'}
                  object={personalInfo}
                  _key={'category'}
                  elements={categories}
                  setObject={setPersonalInfo}
                  arrKey={[]}
                  />    
                  <MySelect
                  labelText={'Специальность'}
                  object={personalInfo}
                  _key={'profession'}
                  elements={professions}
                  setObject={setPersonalInfo}
                  arrKey={[]}
                  />       
                </>
                }
                <MyInput
                labelText={'Телефон'}
                type={'phone'}
                object={personalInfo}
                _key={'phone'}
                setChangeObject={setPersonalInfo}
                placeholderText='Телефон'
                />
                <MyInput
                labelText={'Почта'}
                type={'email'}
                object={personalInfo}
                _key={'mail'}
                setChangeObject={setPersonalInfo}
                placeholderText='Почта'
                />                
                {
                    user.user.isDoctor=== false ?
                    <>
                        <MyInput
                        labelText={'Страховой полис'}
                        type={'text'}
                        object={personalInfo}
                        _key={'insurance_policy'}
                        setChangeObject={setPersonalInfo}
                        placeholderText='Страховой полис'
                        />
                        <MyInput
                        labelText={'Дата рождения'}
                        type={'date'}
                        object={personalInfo}
                        _key={'datebirthd'}
                        setChangeObject={setPersonalInfo}
                        />                     
                    </>
                    :
                    <>
                        <MySelect
                            labelText={'Больница'}
                            object={personalInfo}
                            _key={'hospital_id'}
                            elements={hospitals}
                            setObject={setPersonalInfo}
                            arrKey={["city","number_hospital"]}
                            />    

                            <MySelect
                                labelText={'Контакты'}
                                object={personalInfo}
                                _key={'contacts_id'}
                                elements={contacts}
                                setObject={setPersonalInfo}
                                arrKey={['office_mail','office_phone']}
                                />    
                    </>
                }
                <MyInput
                labelText={'Дата рождения'}
                type={'text'}
                object={user}
                _key={'accountWallet'}
                setChangeObject={null}
                _disabled={true}
                />                     
            <div className='d-flex w-100 mt-3'>
            <Button variant="primary mx-auto" onClick={props.handleClose}>
                Открыть окно смены пароля
            </Button>
            </div>
              </>
            :
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner> 
          }

            </Form>
          </Modal.Body>
          <Modal.Footer className='flex-row-reverse justify-content-between'>
            <Button variant="secondary" onClick={props.handleClose}>
                 Закрыть
            </Button>
            <Button variant="primary" onClick={e => 
            {
                changeData(personalInfo);
                
            }}>
                Сохранить изменения
            </Button>
          </Modal.Footer>
        </Modal>
  )
}

export default memo(PopupPersonalData);
