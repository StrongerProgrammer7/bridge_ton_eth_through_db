// @ts-nocheck

import React, { memo, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { getPersonalInfo, changeData } from "./utils";
import Spinner from 'react-bootstrap/Spinner';
import MyInput from '../../Inputs/MyInput';
import MySelect from '../../Selects/MySelect';
import { useDispatch, useSelector } from 'react-redux';
import { UserControls } from '../../../../models/user';
import { NameWallet } from '../../../../store/enums/WorkWithWallet';
import { Address } from '@ton/core';


function dataPatientIsReady(isDoctor, personalInfo, cities)
{
  return isDoctor == false && personalInfo && cities;
}

function dataDoctorIsReady(isDoctor, personalInfo, hospitals, categories, professions, contacts)
{
  return isDoctor && personalInfo && hospitals && categories && professions && contacts;
}
const PopupPersonalData = (props) => 
{
  const user = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const [personalInfo, setPersonalInfo] = useState(null);
  const [cities, setCities] = useState(null);
  const [categories, setCategories] = useState(null);
  const [contacts, setContacts] = useState(null);
  const [hospitals, setHospitals] = useState(null);
  const [professions, setProfessions] = useState(null);
  const [isLoadUser, setLoadUser] = useState(false);


  useEffect(() =>
  {
    console.log(typeof user.accountWallet, user.accountWallet === '')
    if (user.accountWallet !== undefined && user.personalInfo.id)
      setLoadUser(true);

  }, [user.accountWallet, user.personalInfo.id])

  useEffect(() =>
  {
    getPersonalInfo(user, dispatch, { setCategories, setCities, setContacts, setHospitals, setProfessions, setPersonalInfo })
      .then((results) =>
      {
        console.log(results);
        if (results)
        {
          setPersonalInfo(results[0][0]);
          setContacts(results[1].data.data);
          setCategories(results[2].data.data);
          setHospitals(results[3].data.data);
          setProfessions(results[4].data.data);

          dispatch(UserControls.addExtraDataPersonalInfo({ key: "extra", data: results[0][0] }));
          dispatch(UserControls.setLoading(false));
        }
      })
      .catch(error => console.error(error))

  }, [isLoadUser])

  return (
    <Modal show={ props.show } onHide={ props.handleClose }>
      <Modal.Header closeButton>
        <Modal.Title>{ props.titleModal }</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          {
            (dataPatientIsReady(user.personalInfo.isDoctor, personalInfo, cities)) ||
              (dataDoctorIsReady(user.personalInfo.isDoctor, personalInfo, hospitals, categories, professions, contacts)) ?
              <>

                <MyInput
                  labelText={ 'Имя' }
                  type={ 'text' }
                  formData={ personalInfo }
                  _key={ 'name' }
                  setChangeObject={ setPersonalInfo }
                  placeholderText='Имя'
                > </MyInput>
                <MyInput
                  labelText={ 'Фамилия' }
                  type={ 'text' }
                  formData={ personalInfo }
                  _key={ 'surname' }
                  setChangeObject={ setPersonalInfo }
                  placeholderText='Фамилия'
                />
                <MyInput
                  labelText={ 'Отчество' }
                  type={ 'text' }
                  formData={ personalInfo }
                  _key={ 'lastname' }
                  setChangeObject={ setPersonalInfo }
                  placeholderText='Отчество'
                ></MyInput>

                {
                  user.personalInfo.isDoctor === false ?
                    <>
                      <MySelect
                        labelText={ 'Адрес проживания' }
                        formData={ personalInfo }
                        _key={ 'addressResidence' }
                        elements={ cities }
                        setFormData={ setPersonalInfo }
                        arrKey={ ['region', 'city'] }
                      />
                      <MySelect
                        labelText={ 'Адрес  по прописке' }
                        formData={ personalInfo }
                        _key={ 'city' }
                        elements={ cities }
                        setObject={ setPersonalInfo }
                        arrKey={ ['region', 'city'] }
                      />
                    </>
                    :
                    <>
                      <MySelect
                        labelText={ 'Категория' }
                        formData={ personalInfo }
                        _key={ 'category' }
                        elements={ categories }
                        setObject={ setPersonalInfo }
                        arrKey={ [] }
                      />
                      <MySelect
                        labelText={ 'Специальность' }
                        formData={ personalInfo }
                        _key={ 'profession' }
                        elements={ professions }
                        setObject={ setPersonalInfo }
                        arrKey={ [] }
                      />
                    </>
                }
                <MyInput
                  labelText={ 'Телефон' }
                  type={ 'phone' }
                  formData={ personalInfo }
                  _key={ 'phone' }
                  setChangeObject={ setPersonalInfo }
                  placeholderText='Телефон'
                />
                <MyInput
                  labelText={ 'Почта' }
                  type={ 'email' }
                  formData={ personalInfo }
                  _key={ 'mail' }
                  setChangeObject={ setPersonalInfo }
                  placeholderText='Почта'
                />
                {
                  user.personalInfo.isDoctor === false ?
                    <>
                      <MyInput
                        labelText={ 'Страховой полис' }
                        type={ 'text' }
                        formData={ personalInfo }
                        _key={ 'insurance_policy' }
                        setChangeObject={ setPersonalInfo }
                        placeholderText='Страховой полис'
                      />
                      <MyInput
                        labelText={ 'Дата рождения' }
                        type={ 'date' }
                        formData={ personalInfo }
                        _key={ 'datebirthd' }
                        setChangeObject={ setPersonalInfo }
                      />
                    </>
                    :
                    <>
                      <MySelect
                        labelText={ 'Больница' }
                        formData={ personalInfo }
                        _key={ 'hospital_id' }
                        elements={ hospitals }
                        setObject={ setPersonalInfo }
                        arrKey={ ["city", "number_hospital"] }
                      />

                      <MySelect
                        labelText={ 'Контакты' }
                        formData={ personalInfo }
                        _key={ 'contacts_id' }
                        elements={ contacts }
                        setObject={ setPersonalInfo }
                        arrKey={ ['office_mail', 'office_phone'] }
                      />
                    </>
                }
                <div className="input-group input-group-sm mb-2">
                  <span className="input-group-text" id="inputGroup-sizing-sm">{ 'Кошелек' }</span>
                  <input type={ 'text' }
                    className="form-control"
                    defaultValue={ user.personalInfo?.nameWallet === NameWallet.TON ? Address.parse(user.accountWallet).toString() : user.accountWallet }
                    disabled={ true }
                    required={ true }
                  />
                </div>
                <div className='d-flex w-100 mt-3'>
                  <Button variant="primary mx-auto" onClick={ props.handleClose }>
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
        <Button variant="secondary" onClick={ props.handleClose }>
          Закрыть
        </Button>
        <Button variant="primary" onClick={ e => changeData(personalInfo) }>
          Сохранить изменения
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default memo(PopupPersonalData);
