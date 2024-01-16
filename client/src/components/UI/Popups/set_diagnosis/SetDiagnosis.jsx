// @ts-nocheck
import React, {useRef, useState} from 'react'
import { useEffect } from 'react';
import { useLayoutEffect } from 'react';
import { Modal, Button,Form } from 'react-bootstrap';
import { getTotalDataAboutDiagnosis,setDiagnosis } from './utils';



const getOptionByKey = (elem,personalInfoKey,personalInfo) =>
{
    return (
        <option  key={elem[personalInfoKey]} value={elem[personalInfoKey]} >{elem[personalInfoKey]} </option>
    ) 
}
const getElementSelect = (title,personalInfo,personalInfoKey,setPersonalInfo,elements,setNameIll=null,_ref=undefined) =>
{
  // if(elements[0][personalInfoKey])
  //   personalInfo[personalInfoKey] = elements[0][personalInfoKey];
  // console.log(personalInfo);
  return (
    <div className="input-group input-group-sm mb-3">
        <span className="input-group-text" id="inputGroup-sizing-sm">{title}</span>

        <select className="form-control"
        ref={_ref}
        onChange={(e)=>
        {
          if(setNameIll)
          {
            setNameIll(e.target.value);
          }
          personalInfo[personalInfoKey] = e.target.value;
          setPersonalInfo(personalInfo);
        }}
        defaultValue={personalInfo[personalInfoKey]}>
          {
            elements.map((elem) =>
            {
                return getOptionByKey(elem,personalInfoKey,personalInfo)
            })
          }
        </select>
    </div>
  )
}

const getElementInputAndSetDefault = (title,personalInfo,keyPersonalInfo,type="textarea",required=true,_ref=undefined) =>
{
    const _defaultValue = personalInfo[keyPersonalInfo] || "";

    return (
        <div className="input-group input-group-sm mb-2">
            <span className="input-group-text">{title}</span>
            <input 
            type={type} 
            className="form-control"  
            required={required} 
            ref={_ref}
            defaultValue={_defaultValue}
            onChange={e => personalInfo[keyPersonalInfo] = e.target.value}/>
        </div>
    )
}
/*TODO: Realisation filter 
function findMatches (search, options) 
{
  return options.filter(option => 
  {
    const regex = new RegExp(search, 'gi');
    return option.text.match(regex);
  });
}
function filterOptions (e,select,name_ill) 
{
  const options = Array.from(select.current.options);
  console.log(select.current.options);
  options.forEach(option => 
  { 
    option.remove();
    option.selected = false;
  });
  if(e.target.value === '')
  {
    const collection = new HTMLOptionsCollection();
    const arr = [];
    name_ill.forEach((elem) =>
    {
      //arr.push( new Option(elem.name_ill,elem.name_ill));
      collection.add(new Option(elem.name_ill,elem.name_ill))
    });
    
    
    console.log(arr);
    select.current.options = collection;
    console.log(select);
    return;
  }
  console.log(select.current);
  const matchArray = findMatches(e.target.value, options);
  console.log()
  select.current.append(...matchArray);
}*/

const SetDiagnosis = (props) => 
{
    const select = useRef();
    const inputRef = useRef();
    const [personalInfo,setPersonalInfo] = useState({});

    const [classification,setClassification] = useState([]);
    const [name_ills,setNameIlls] = useState([]);

    useLayoutEffect(()=>
    {
        getTotalDataAboutDiagnosis().then((data) =>
        {
            console.log(props);
            setClassification(data?.classification);
            setNameIlls(data?.name_ill);
            setPersonalInfo(props?.data_patient);
        })
        .catch(error => console.error(error));

       
    },[])

    useEffect(()=>
    {
        setPersonalInfo(props?.data_patient);
    },[props.data_patient]);

  return (
    <>

    <Modal show={props.show} onHide={props.close}>
        <Modal.Header closeButton>
            <Modal.Title>{props.title} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <div className="input-group input-group-sm mb-3">
                    {/* <input type="text" placeholder="Filter by name" className="form-control"  ref={filterRef}
                    onChange={e =>
                      {
                        if(select && select.current)
                          filterOptions(e,select,name_ills);
                      }
                    }/> */}
                    <div className="input-group input-group-sm mb-3">
                          <span className="input-group-text" id="inputGroup-sizing-sm">Список болезни</span>
                          <select className="form-control"
                          ref={select}
                          onChange={(e)=>
                          {
                            inputRef.current.value = e.target.value;
                            personalInfo["name_ill"] = e.target.value;
                            setPersonalInfo(personalInfo);
                          }}
                          defaultValue={personalInfo["name_ill"]}>
                            {
                              name_ills.map((elem) =>
                              {
                                  return getOptionByKey(elem,"name_ill",personalInfo)
                              })
                            }
                          </select>
                      </div>
                    {getElementInputAndSetDefault("Название болезни",personalInfo,"name_ill","text",true,inputRef)}
                </div>
                {getElementInputAndSetDefault("Лечение",personalInfo,"treatment")}
                
                {getElementSelect("Классификация",personalInfo,"classification",setPersonalInfo,classification)}

                {getElementInputAndSetDefault("Дата начала лечения",personalInfo,"date_ill","datetime-local")}
                {getElementInputAndSetDefault("Дата окончания лечения",personalInfo,"date_cured","datetime-local",false)}
                {getElementInputAndSetDefault("Статус",personalInfo,"status","text",false)}   
               
                <div className="input-group input-group-sm mb-3">
                    <span className="input-group-text" id="inputGroup-sizing-sm">Ваш аккаунт</span>
                    <input type="text"  className="form-control" defaultValue={props.user.accountWallet} disabled required/>
                </div>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.close}>
            Close
          </Button>
          <Button variant="primary" onClick={async (e) => 
          {
            console.log(personalInfo);
            const result = await setDiagnosis(personalInfo,props.changeDiagnosis,props.user.accountWallet);
            if(!result.data)
              result.data = personalInfo;
            props.setNewDataAboutPatient(result);
            props.close();
          }}>
            {props.changeDiagnosis ? "Изменить " : "Поставить"} диагноз
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SetDiagnosis
