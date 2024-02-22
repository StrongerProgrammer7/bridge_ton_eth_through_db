// @ts-nocheck
import React, { useContext, useState, useEffect, useRef } from "react";
import { Context } from "../../../";
import css from './profile_doctor.module.css';
import Accordion from 'react-bootstrap/Accordion';
import { addRow, changeRow, isExistsAcessShowModal } from "./utils";
import { getListPatients, getListIllsPatients } from "./helper";
import { getRowData, openTab } from "../total_utlls";
import SetDiagnosis from "../../../components/UI/Popups/set_diagnosis/SetDiagnosis";
import MyTable from "../../../components/UI/Tables/MyTable";


const ProfileDoctor = () =>
{
  const { user } = useContext(Context);

  const tablePatientRef = useRef();
  const tableIllsRef = useRef();

  const [dt_patients, setDT_patients] = useState();
  const [dt_ills, setDT_ills] = useState();
  const [isOpenPatients, setOpenPatients] = useState(false);
  const [isOpenIlls, setOpenIlls] = useState(false);
  const [showModalSetDiagnosis, setDiagnosisModalShow] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState({});
  const [newDataAboutPatient, setNewDataAboutPatient] = useState(undefined);
  const [changeDiagnosis, setChangeDiagnosis] = useState(false);

  const handleShow = () => setDiagnosisModalShow(true);
  const handleClose = () => setDiagnosisModalShow(false);

  useEffect(() =>
  {
    let idtime;

    function getDataFromTableAndShowModal(event, dt, user, isChangeDiagnosis)
    {
      setChangeDiagnosis(isChangeDiagnosis);
      const data = getRowData(event, dt);
      setSelectedRowData(data);

      isExistsAcessShowModal(idtime, data.meta, user, handleShow);
    }
    function handleClick(event) 
    {
      if (event.target.id === "btn_changeDiagnosis")
      {
        getDataFromTableAndShowModal(event, dt_ills, user, true);
      }
      if (event.target.id === "btn_moreInfo_ill")
        console.log("TODO: show more information about ill");
      if (event.target.id === "btn_action_setDiagnosis")
      {
        getDataFromTableAndShowModal(event, dt_patients, user, false);
      }
    }

    document.addEventListener("click", handleClick);

    return () =>
    {
      document.removeEventListener("click", handleClick);
      clearTimeout(idtime);
    };
  }, [tablePatientRef, tableIllsRef, dt_patients, dt_ills, user]);

  useEffect(() =>
  {
    if (!newDataAboutPatient) return;
    if (changeDiagnosis === false)
    {
      const result = newDataAboutPatient.data[0];

      addRow(result, user, dt_ills, setNewDataAboutPatient);
    } else
    {
      const result = newDataAboutPatient.data;
      changeRow(result, user, dt_ills, setNewDataAboutPatient);
    }

  }, [newDataAboutPatient]);

  return (
    <>
      <main className={ css.main }>
        <section id="dataset" className={ `${ css.dataset } mt-3` }>
          <Accordion >
            <Accordion.Item eventKey="0">
              <Accordion.Header
                onClick={ e =>
                {
                  openTab(isOpenPatients, getListPatients,
                    {
                      dtRef: tablePatientRef,
                      setDT: setDT_patients,
                      setOpenTab: setOpenPatients,
                      dt: dt_patients
                    },
                    user);

                } }>
                Список Пациентов
              </Accordion.Header>
              <Accordion.Body>
                <MyTable
                  tableRef={ tablePatientRef }
                  idTableBody={ 'table_doctors_tbody' }
                  ths={ [
                    { name: '#', classname: '' },
                    { name: 'Инициалы фамилия', classname: '' },
                    { name: 'Почта', classname: '' },
                    { name: 'Город', classname: '' },
                    { name: 'Действия', classname: '' },
                    { name: 'Список врачей', classname: '' },
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
                  openTab(isOpenIlls, getListIllsPatients,
                    {
                      dtRef: tableIllsRef,
                      setDT: setDT_ills,
                      setOpenTab: setOpenIlls,
                      dt: dt_ills
                    },
                    user);
                } }>
                Список болезней
              </Accordion.Header>
              <Accordion.Body>
                <MyTable
                  tableRef={ tableIllsRef }
                  idTableBody={ '' }
                  ths={ [
                    { name: '#', classname: '' },
                    { name: 'Фамилия', classname: '' },
                    { name: 'Название', classname: '' },
                    { name: 'Лечение', classname: '' },
                    { name: 'Классификация', classname: '' },
                    { name: 'Дата начала лечения', classname: '' },
                    { name: 'Дата окончания лечения', classname: '' },
                    { name: 'Статус', classname: '' },
                    { name: 'Взаимодействие', classname: '' },
                    { name: 'id', classname: css.hide_columns },
                    { name: 'id_patient', classname: css.hide_columns },
                    { name: 'meta', classname: css.hide_columns }
                  ] }
                ></MyTable>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </section>
      </main>
      <SetDiagnosis
        show={ showModalSetDiagnosis }
        close={ handleClose }
        changeDiagnosis={ changeDiagnosis }
        title={ `${ changeDiagnosis ? "Изменить" : "Поставить " } диагноз` }
        user={ user }
        data_patient={ selectedRowData }
        setNewDataAboutPatient={ setNewDataAboutPatient } />
    </>
  )
}

export default ProfileDoctor;