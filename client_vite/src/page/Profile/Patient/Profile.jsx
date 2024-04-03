/* eslint-disable no-undef */
// @ts-nocheck
import React, { useState, useRef, useEffect } from "react";
import css from './profile.module.css';
import Accordion from 'react-bootstrap/Accordion';


import { getTableActualIll, getTableAllDoctors, getTableAllIlls } from "./utils";
import { updateListDoctorsGiveRole, updateListDoctorsRevokeRole } from "./helper";
import MyTable from "../../../components/UI/Tables/MyTable";
import { getRowData, openTab } from "../total_utlls";
import { useDispatch, useSelector } from "react-redux";
import 'datatables.net-bs5';

const Profile = () =>
{
  const user = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const tableDoctorsRef = useRef();
  const tableIllsRef = useRef();
  const tableActualIllsRef = useRef();

  const [dt_doctors, setDT_doctors] = useState();
  const [dt_ills, setDT_ills] = useState();
  const [dt_actualIlls, setDT_actualIlls] = useState();
  const [isOpenDoctors, setOpenDoctors] = useState(false);
  const [isOpenIlls, setOpenIlls] = useState(false);

  useEffect(() =>
  {

    if (!dt_actualIlls)
      getTableActualIll(tableActualIllsRef, user)
        .then(data =>
        {
          console.log(data);
          setDT_actualIlls(data);
        });
  }, [user.accountWallet, dt_actualIlls])
  useEffect(() =>
  {
    function handleClick(event) 
    {
      if (event.target.id === "btn_action_giveAccess")
      {
        const data = getRowData(event, dt_doctors);
        if (data)
          updateListDoctorsGiveRole(data.id, data.meta, user, dispatch, dt_doctors, event.target); //TODO запись в ТОН Адресс
      }
      if (event.target.id === "btn_action_revokeAccess")
      {
        const data = getRowData(event, dt_doctors); //TODO удалить из ТОН Адресс
        if (data)
          updateListDoctorsRevokeRole(data.id, data.meta, user, dispatch, dt_doctors, event.target);
      }
    }

    function recalcTables()
    {
      if (dt_ills && tableIllsRef.current)
      {
        //dt_ills.columns.adjust().draw(); 
        // dt_ills.columns?.adjust().draw();
        dt_ills.responsive?.recalc();
        dt_ills.columns?.adjust().responsive.recalc();
      }
      if (dt_doctors && tableDoctorsRef.current)
      {
        //dt_doctors.columns?.adjust().draw();
        dt_doctors.responsive?.recalc();
        dt_doctors.columns?.adjust().responsive.recalc();
      }
      if (dt_actualIlls && tableActualIllsRef.current)
      {
        // dt_actualIlls.columns?.adjust().draw();
        dt_actualIlls.responsive?.recalc();
        dt_actualIlls.columns?.adjust().responsive.recalc();
      }
    }

    document.addEventListener("click", handleClick);
    document.addEventListener('resize', recalcTables);

    return () =>
    {
      document.removeEventListener("click", handleClick);
      document.removeEventListener('resize', recalcTables);
    };
  }, [tableDoctorsRef, dt_doctors, user]);

  return (
    <main className={ css.main }>
      <section id="options_data" className={ css.options_data }>
        <MyTable
          tableRef={ tableActualIllsRef }
          idTableBody={ 'table_actual_ills_tbody' }
          ths={ [
            { name: '#', classname: '' },
            { name: 'Болезнь', classname: '' },
            { name: 'Лечение', classname: '' }
          ] }
        ></MyTable>
      </section>
      <section id="dataset" className={ `${ css.dataset } mt-3` }>
        <Accordion >
          <Accordion.Item eventKey="0">
            <Accordion.Header
              onClick={ e =>
              {
                openTab(isOpenDoctors, getTableAllDoctors,
                  {
                    dtRef: tableDoctorsRef,
                    setDT: setDT_doctors,
                    setOpenTab: setOpenDoctors,
                    dt: dt_doctors
                  },
                  user,
                  dispatch);
              } }>
              Список врачей
            </Accordion.Header>
            <Accordion.Body>
              <MyTable
                tableRef={ tableDoctorsRef }
                idTableBody={ 'table_doctors_tbody' }
                ths={ [
                  { name: '#', classname: '' },
                  { name: 'Инициалы', classname: '' },
                  { name: 'Почта', classname: '' },
                  { name: 'Профессия', classname: '' },
                  { name: 'Город', classname: '' },
                  { name: 'Действия', classname: '' },
                  { name: 'Id', classname: css.hide_columns },
                  { name: 'meta', classname: css.hide_columns }
                ] }
              ></MyTable>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header
              onClick={ e =>
              {
                openTab(isOpenIlls, getTableAllIlls,
                  {
                    dtRef: tableIllsRef,
                    setDT: setDT_ills,
                    setOpenTab: setOpenIlls,
                    dt: dt_ills
                  },
                  user,
                  dispatch);


              } }>
              Список болезней
            </Accordion.Header>
            <Accordion.Body>
              <MyTable
                tableRef={ tableIllsRef }
                idTableBody={ '' }
                ths={ [
                  { name: '#', classname: '' },
                  { name: 'Название', classname: '' },
                  { name: 'Лечение', classname: '' },
                  { name: 'Классификация', classname: '' },
                  { name: 'Дата начала лечения', classname: '' },
                  { name: 'Дата окончания лечения', classname: '' },
                  { name: 'Статус', classname: '' },
                  { name: 'Больше информации', classname: '' },
                  { name: 'id', classname: css.hide_columns }
                ] }
              ></MyTable>

            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </section>
    </main>
  )
}

export default Profile;