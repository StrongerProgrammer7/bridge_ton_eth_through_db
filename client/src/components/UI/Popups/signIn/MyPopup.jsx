// @ts-nocheck
import React, { useContext } from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Context } from '../../../../App';
import { getDataAboutPatient,getDataAboutDoctor, signIn, getCities ,changeData} from "./utils";
import Spinner from 'react-bootstrap/Spinner';
import { getData } from '../../../../http/getDataAPI';
import { useLayoutEffect } from 'react';
import { ContextAuthRegistration } from "../../../../App";

const getElementSelectCity = (personalInfo,key,setPersonalInfo,cities,title)=>
{
  return (
    <div className="input-group input-group-sm mb-2">
      <span className="input-group-text" id="inputGroup-sizing-sm">{title}</span>
      <select className="form-control" 
      onChange={(e)=>
      {
        personalInfo[key] = e.target.value;
        setPersonalInfo(personalInfo);

      }}>
        {
          cities.map((city) =>
          {

            if (city.city === personalInfo.addressResidence)
              return (
                <option key={city.id} value={city.id} selected>{city.region}:{city.city}</option>
              )
            return (
              <option key={city.id} value={city.id} >{city.region}:{city.city}</option>
            )
          })
        }
      </select>
    </div>
  )
}

const getOptionByKey = (elem,personalInfoKey,personalInfo) =>
{
  const select = personalInfo[personalInfoKey] === elem[personalInfoKey];
  return (
    <option  key={elem[personalInfoKey]} value={elem[personalInfoKey]} selected={select}>{elem[personalInfoKey]} </option>
  ) 
}

const getOptionBySetKey = (elem,personalInfoKey,personalInfo,arrKey) =>
{
    let title = "";
    let select = personalInfo[personalInfoKey] === elem.id;
    for(const key of arrKey)
    {
      title += elem[key] + " : ";
    }
    return (
      <option key={elem.id} value={elem.id} selected={select}>{title}</option>
    )
}

const getElementSelect = (title,personalInfo,personalInfoKey,setPersonalInfo,elements,arrKey=[]) =>
{
  return (
    <div className="input-group input-group-sm mb-3">
        <span className="input-group-text" id="inputGroup-sizing-sm">{title}</span>

        <select className="form-control"
        onChange={(e)=>
        {
          personalInfo[personalInfoKey] = e.target.value;
          setPersonalInfo(personalInfo);
        }}>
          {
            elements.map((elem) =>
            {
             
              if(elem.id)
              {
                return getOptionBySetKey(elem,personalInfoKey,personalInfo,arrKey);
              }else
              {
                return getOptionByKey(elem,personalInfoKey,personalInfo)
              }
              
            })
          }
          
        </select>
    </div>
  )
}

const getElementInput = (titleInput,type,personalInfo,setPersonalInfo,key,default_value) =>
{
  return (
    <div className="input-group input-group-sm mb-2">
      <span className="input-group-text" id="inputGroup-sizing-sm">{titleInput}</span>
      <input type={type} className="form-control"defaultValue={default_value}
      onClick={e =>
        {
          personalInfo[key] = e.target.value;
          setPersonalInfo(personalInfo);
        }
      }/>
  </div>
  )
}


 async function getPersonalInfo(wallet,user,propsSet)
{
  if(user.user.isDoctor === false)
  {
    const data = await getDataAboutPatient(wallet);
    const cities = await getCities();
    console.log(cities);
    propsSet.setPersonalInfo(data);
    propsSet.setCities(cities);
    user.addExtraData("extra",data);
  }else
  {
    Promise.all([
      await getDataAboutDoctor(wallet),
      await getData("api/get_contacts_doctors"),
      await getData("api/get_all_categories_doctors"),
      await getData("api/get_hospitals"),
      await getData("api/get_all_profession_doctors"),
      ])
      .then(results =>
      {
        console.log(results);
        propsSet.setPersonalInfo(results[0][0]);
        propsSet.setContacts(results[1].data.data);
        propsSet.setCategories(results[2].data.data);
        propsSet.setHospitals(results[3].data.data);
        propsSet.setProfessions(results[4].data.data);
        user.addExtraData("extra",results[0][0]);
        
      })
      .catch(error=>console.log(error))
  }
 
}

const MyPopup = (props) => 
{
  
  const { user } = useContext(Context);
  const { isLoading } = useContext(ContextAuthRegistration);
  const [isLoadingPersonalData,setLoadingPersonalData] = useState(true);
    const [show, setShow] = useState(false);
    const [wallet,setWallet] = useState(user.accountWallet);
    const [personalInfo,setPersonalInfo] = useState(null);
    const [cities,setCities] = useState(null);
    const [categories,setCategories] = useState(null);
    const [contacts,setContacts] = useState(null);
    const [hospitals,setHospitals] = useState(null);
    const [professions,setProfessions] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
 //isLogIn setLogIn
    const [password,setPassword] = useState('');
    
    useEffect(()=>
      { 
        if(user && user.accountWallet === '') return;
        if(props.isSignIn === true) return;
        console.log(user.accountWallet);
        getPersonalInfo(user.accountWallet,user,{setCategories,setCities,setContacts,setHospitals,setProfessions,setPersonalInfo});
        const idSet = setTimeout(()=>
        {
          console.log(personalInfo);
          setLoadingPersonalData(false);
        },5000);
        return () =>
        {
          clearTimeout(idSet);
        };
      },[user,user.accountWallet,props.isSignIn])

    

    if(isLoading)
    {
        return(
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          );
    }

    return (
      <>
        <Button 
        variant="light" 
        onClick={e => 
          {
            setWallet(user.accountWallet);
            if(props.isLogIn)
            {
              window.open("/profile","_self");
            }else
            {
              handleShow();
            }
              
            
          }}
        className="me-2"
        
        >
          {props.titleButton}
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{props.titleModal}</Modal.Title>
          </Modal.Header>
          {
            props.isSignIn === true ? 
            <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>Аккаунт</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="meta"
                  defaultValue={wallet}
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
                  onChange={e => setPassword(e.target.value)}
                  autoComplete='true'
                  autoFocus                  
                />
              </Form.Group>
              
              <Form.Group>
                <Form.Check 
                type='checkbox'
                disabled={!user.user.isDoctor}
                label={'Войти как врач'}/> 
              </Form.Group>
            </Form>
          </Modal.Body>
            :
            <Modal.Body>
            <Form>
              {
              isLoadingPersonalData === false ? 
              <div>
                  {getElementInput("Имя","text",personalInfo,setPersonalInfo,"name",personalInfo.name)}
                  {getElementInput("Фамилия","text",personalInfo,setPersonalInfo,"surname",personalInfo.surname)}
                  {getElementInput("Отчество","text",personalInfo,setPersonalInfo,"lastname",personalInfo.lastname)}
                  
                {
                  user.user.isDoctor === false ?
                  getElementSelectCity(personalInfo,"address_of_residence",setPersonalInfo,cities,"Адрес проживания")
                  
                :
                getElementSelect("Категория",personalInfo,"category",setPersonalInfo,categories)
                }
                {
                  user.user.isDoctor === false ?
                  getElementSelectCity(personalInfo,"address_of_residence",setPersonalInfo,cities,"Адрес  по прописке")
                  :
                  getElementSelect("Специальность",personalInfo,"profession",setPersonalInfo,professions)
                }
                {getElementInput("Телефон","phone",personalInfo,setPersonalInfo,"phone",personalInfo.phone)}
                {getElementInput("Почта","email",personalInfo,setPersonalInfo,"mail",personalInfo.mail)}
                
                {
                  user.user.isDoctor=== false ?
                  <div className="input-group input-group-sm mb-3">
                  <span className="input-group-text" id="inputGroup-sizing-sm">Страховой полис</span>
                  <input type="text" className="form-control" id="insurancePolicy" defaultValue={personalInfo.insurance_policy}
                  onClick={e =>
                    {
                      personalInfo.insurance_policy = e.target.value;
                      setPersonalInfo(personalInfo);
                    }
                  }/>
                </div>
                  :
                  getElementSelect("Больница",personalInfo,"hospital_id",setPersonalInfo,hospitals,["city","number_hospital"])

                }

                {
                  user.user.isDoctor === false ?
                  getElementInput("Дата рождения","date",personalInfo,setPersonalInfo,"datebirthd",personalInfo.datebirthd)
                  
                  :
                  getElementSelect("Контакты",personalInfo,"contacts_id",setPersonalInfo,contacts,["office_mail","office_phone"])
                }
                
                <div className="input-group input-group-sm mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-sm">Ваш аккаунт</span>
                  <input type="text"  autoComplete="username" className="form-control" defaultValue={wallet} disabled/>
                </div>
              </div>
            :
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner> 
          }

            <Button variant="primary" onClick={handleClose}>
                Открыть окно смены пароля
            </Button>
            </Form>
          </Modal.Body>
          }
          
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Закрыть
            </Button>
            <Button variant="primary" onClick={e => 
            {
              if(props.isSignIn)
                signIn({meta:wallet,pass:password,isDoctor:user.user.isDoctor},user,props.setLogIn)
              else
                changeData(personalInfo);
            }}>
              { props.isSignIn ? 'Войти' : 'Сохранить изменения' }
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default MyPopup;
