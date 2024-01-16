/* eslint-disable no-undef */
// @ts-nocheck
import React, {useContext, useState, useRef, useEffect} from "react";
import css from './profile.module.css';
import Accordion from 'react-bootstrap/Accordion';
import { Context } from "../../../App";

import { recalcTable, getRowData, getTableActualIll, getTableAllDoctors, getTableAllIlls} from "./utils";
import { updateListDoctorsGiveRole,updateListDoctorsRevokeRole } from "./helper";


const Profile = () =>
{
  const { user } = useContext(Context);

  const tableDoctorsRef = useRef();
  const tableIllsRef = useRef();
  const tableActualIllsRef = useRef();

  const [dt_doctors,setDT_doctors] = useState();
  const [dt_ills,setDT_ills] = useState();
  const [dt_actualIlls,setDT_actualIlls] = useState();
  const [isOpenDoctors,setOpenDoctors] = useState(false);
  const [isOpenIlls,setOpenIlls] = useState(false);

  useEffect(()=>
  {
    if(!dt_ills)
      getTableActualIll(tableActualIllsRef,user)
      .then(data =>
        {
          console.log(data);
          setDT_actualIlls(data);
        });
  },[user,user.accountWallet])
  useEffect(()=>
  {
    function handleClick(event) 
    {
      if(tableDoctorsRef.current)
      {
        if(event.target.id === "btn_action_giveAccess")
        {
          const data = getRowData(event,dt_doctors);
          if(data)
            updateListDoctorsGiveRole(data.id,data.meta,user,dt_doctors,event.target);
        }
        if(event.target.id === "btn_action_revokeAccess")
        {
          const data = getRowData(event,dt_doctors);
          if(data)
            updateListDoctorsRevokeRole(data.id,data.meta,user,dt_doctors,event.target);
        }
      }
    }

    document.addEventListener("click",handleClick);

    return () =>
    {
      document.removeEventListener("click", handleClick);
    };
  },[tableDoctorsRef,dt_doctors,user]);
  
    return (
        <>
       <main className={css.main}>
        <section id="options_data" className={css.options_data}>
          <table className="table display responsive wrap" style={{width: "100%"}} ref={tableActualIllsRef} >
            <thead>
              <tr>
               
              </tr>
              <tr className="">
                <th scope="col">#</th>
                <th scope="col">Болезнь</th>
                <th scope="col">Лечение</th>
              </tr>
            </thead>
            <tbody id="table_actual_ills_tbody">
            </tbody>
          </table>
        </section>
        <section id="dataset" className={`${css.dataset} mt-3`}>
          <Accordion >
            <Accordion.Item eventKey="0">
              <Accordion.Header
              onClick={e =>
              {
                if(isOpenDoctors === false)
                {
                  getTableAllDoctors(tableDoctorsRef,user)
                  .then((data) =>
                  setDT_doctors(data))
                
                  setOpenDoctors(true);
                }else
                {
                  if(dt_doctors)
                  {
                    console.log(dt_doctors);
                    recalcTable(dt_doctors,200);

                  }else
                    setOpenDoctors(false); //TODO: Add button for get new data from server
                }
                
              }}>
                  Список врачей
              </Accordion.Header>
                <Accordion.Body>
                  <table className="table table-light display responsive nowrap" style={{width: "100%"}} ref={ tableDoctorsRef } >
                    <thead>
                      <tr>
                        
                      </tr>
                      <tr className="">
                        <th scope="col">#</th>
                        <th scope="col">Initials surname</th>
                        <th scope="col">Mail</th>
                        <th scope="col">Profession</th>
                        <th scope="col">City</th>
                        <th scope="col">Action</th>
                        <th scope="col" className={css.hide_columns}>Id</th>
                        <th scope="col" className={css.hide_columns}>meta</th>
                      </tr>
                    </thead>
                    <tbody id="table_doctors_tbody">
                    </tbody>
                  </table>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header
              onClick={e =>
                {
                  if(isOpenIlls === false)
                  {
                    getTableAllIlls(tableIllsRef, user)
                    .then((data) =>
                    {
                      if(data)
                        setDT_ills(data);
                    });            
                    setOpenIlls(true);
                  }else
                  {
                    if(dt_ills && dt_actualIlls)
                    {
                      recalcTable(dt_ills,200);
                      recalcTable(dt_actualIlls,200);
                      
                    }else
                      setOpenIlls(false); //TODO: Add button for get new data from server
                  }
                  
                }}>
              Список болезней
              </Accordion.Header>
                <Accordion.Body>
                  <table className="table table-striped table-light display responsive wrap" style={{width:"100%"}} ref={tableIllsRef} >
                    <thead>
                      <tr className="">
                        <th scope="col">#</th>
                        <th scope="col">Название</th>
                        <th scope="col">Лечение</th>
                        <th scope="col">Классификация</th>
                        <th scope="col">Дата начала лечения</th>
                        <th scope="col">Дата окончания лечения</th>
                        <th scope="col">Статус</th>
                        <th scope="col">Больше информации</th>
                        <th scope="col" className={css.hide_columns} >id</th>
                      </tr>
                    </thead>
                    <tbody>
                    </tbody>
                  </table>
                </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </section>
      </main>
      
      <div id="problems">
        <div id="problems_withAccount"  style={{display: "none"}}>
      
        </div>
        <div id="problems_withContract"  style={{display: "none"}}>
      
        </div>
      </div>
        </>
    )
}

export default Profile;