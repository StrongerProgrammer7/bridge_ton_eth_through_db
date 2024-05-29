/* eslint-disable no-undef */
// @ts-nocheck
import React, { useState, useRef, useEffect } from "react";
import css from './profile.module.css';
import Accordion from 'react-bootstrap/Accordion';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { getTableActualIll, getTableAllDoctors, getTableAllIlls } from "./utils";
import { updateListDoctorsGiveRoleETH, updateListDoctorsGiveRoleTON, updateListDoctorsRevokeRoleETH, updateListDoctorsRevokeRoleTON } from "./helper";
import MyTable from "../../../components/UI/Tables/MyTable";
import { getRowData, openTab } from "../total_utlls";
import { useDispatch, useSelector } from "react-redux";
import 'datatables.net-bs5';
import { NameWallet } from "../../../store/enums/WorkWithWallet";
import useTonClient from "../../../hooks/useTonClient";
import { useTonConnect } from "../../../hooks/useTonConnect";
import Message from "../../../components/UI/Popups/message/Message";

const Profile = () =>
{
  const user = useSelector(state => state.userReducer);
  const { client } = useTonClient();
  const { sender } = useTonConnect();
  const dispatch = useDispatch();

  const tableDoctorsRef = useRef();
  const tableIllsRef = useRef();
  const tableActualIllsRef = useRef();

  const [dt_doctors, setDT_doctors] = useState();
  const [dt_ills, setDT_ills] = useState();
  const [dt_actualIlls, setDT_actualIlls] = useState();
  const [isOpenDoctors, setOpenDoctors] = useState(false);
  const [isOpenIlls, setOpenIlls] = useState(false);

  const [showModalMnemonic, setShowModalMnemonic] = useState(false);
  const [dataCurrentDoc, setDataCurrentDoc] = useState({ mnemonic: "orient uncle light cause emotion wonder rose skin scout solution expand lady frown subject weather void wasp claw easily economy remember dance ice pelican" });

  const [message, setMessage] = useState('');
  const [showModalMessage, setShowModalMessage] = useState(false);
  const handleShowModalMessage = () => setShowModalMessage(true);
  const handleCloseModalMessage = () => setShowModalMessage(false);

  const handleClose = () => setShowModalMnemonic(false);
  const handleShow = () => setShowModalMnemonic(true);


  useEffect(() =>
  {
    if (!user.accountWallet || !tableActualIllsRef)
      return;

    getTableActualIll(tableActualIllsRef, user)
      .then(data =>
      {
        setDT_actualIlls(data);
      });
  }, [user.accountWallet, tableActualIllsRef.current])
  useEffect(() =>
  {
    function handleClick(event) 
    {
      if (event.target.id === "btn_action_giveAccess")
      {
        const data = getRowData(event, dt_doctors);
        if (!data)
          return;
        if (user.personalInfo.nameWallet === NameWallet.ETH)
        {
          updateListDoctorsGiveRoleETH(data.id, data.meta, user, dispatch, dt_doctors, event.target)
            .then((result) =>
            {
              handleShowModalMessage();
              if (result)
              {

                setMessage(`Теперь у врача есть доступ `);
              } else
              {
                if (!result)
                  setMessage(`Неизвесная ошибка ${ result }`);
                else
                  setMessage(`Что-то пошло не так, вы скорее всего отказались забрать доступ`);
              }
              setTimeout(() =>
              {
                handleCloseModalMessage();
              }, 5000);
            })
        }
        else
        {
          setDataCurrentDoc({ ...dataCurrentDoc, id: data.id, meta: data.meta, btn: event.target });
          handleShow();
        }
      }
      if (event.target.id === "btn_action_revokeAccess")
      {
        const data = getRowData(event, dt_doctors); //TODO удалить из ТОН Адресс
        if (!data)
          return;
        if (user.personalInfo.nameWallet === NameWallet.ETH)
          updateListDoctorsRevokeRoleETH(data.id, data.meta, user, dispatch, dt_doctors, event.target)
            .then((result) =>
            {
              handleShowModalMessage();
              if (result)
              {

                setMessage(`Теперь у врача нет доступа `);
              } else
              {
                setMessage(`Неизвесная ошибка ${ result }`);
              }
              setTimeout(() =>
              {
                handleCloseModalMessage();
              }, 5000);
            })
        else
        {
          setDataCurrentDoc({ ...dataCurrentDoc, id: data.id, meta: data.meta, btn: event.target });
          handleShow();
        }

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
    window.addEventListener('resize', recalcTables);
    return () =>
    {
      document.removeEventListener("click", handleClick);
      window.removeEventListener('resize', recalcTables);
    };
  }, [user, dt_doctors, dt_actualIlls, dt_ills]);


  if (!user.accountWallet || !user.contract || user.loading)
  {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
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

      <>
        <Modal show={ showModalMnemonic } onHide={ handleClose }>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p> Mnemonic using only on your side and don't send by network</p>
            <div className="mb-3" style={ { display: "block" } }>
              <input
                type="password"
                className="form-control"
                required={ user.personalInfo.nameWallet === NameWallet.TON } defaultValue="orient uncle light cause emotion wonder rose skin scout solution expand lady frown subject weather void wasp claw easily economy remember dance ice pelican"
                onChange={ e => setDataCurrentDoc({ mnemonic: e.target.value, ...dataCurrentDoc }) }
                autoComplete="none" />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={ () => { setDataCurrentDoc(undefined); handleClose(); } }>
              Close
            </Button>
            <Button variant="primary"
              onClick={ () =>
              {
                const utils_ton =
                {
                  mnemonic: dataCurrentDoc.mnemonic,
                  client,
                  sender,
                };

                if (dataCurrentDoc.btn.id === 'btn_action_giveAccess')
                  updateListDoctorsGiveRoleTON(dataCurrentDoc.id, dataCurrentDoc.meta, user, dispatch, dt_doctors, dataCurrentDoc.btn, utils_ton)
                    .then((result) =>
                    {
                      handleShowModalMessage();
                      if (result)
                      {

                        setMessage(`Теперь у врача есть доступ `);
                      } else
                      {
                        setMessage(`Произошла какая-то ошибка ${ result }`);
                      }
                      setTimeout(() =>
                      {
                        handleCloseModalMessage();
                      }, 5000);
                    })
                else
                  updateListDoctorsRevokeRoleTON(dataCurrentDoc.id, dataCurrentDoc.meta, user, dispatch, dt_doctors, dataCurrentDoc.btn, utils_ton).
                    then((result) =>
                    {
                      handleShowModalMessage();
                      if (result)
                      {

                        setMessage(`Теперь у врача нет доступа `);
                      } else
                      {
                        setMessage(`Произошла какая-то ошибка ${ result }`);
                      }
                      setTimeout(() =>
                      {
                        handleCloseModalMessage();
                      }, 5000);
                    })
                handleClose();
              } }>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        <Message
          handleCloseModalMessage={ handleCloseModalMessage }
          message={ message }
          showModalMessage={ showModalMessage }
        />
      </>
    </main>
  )
}

export default Profile;
