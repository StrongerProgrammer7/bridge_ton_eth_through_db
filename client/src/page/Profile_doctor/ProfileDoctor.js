// @ts-nocheck
import React,{useContext,useState,useEffect,useRef, useLayoutEffect} from "react";
import { Context } from "../../App";
import css from './profile_doctor.module.css';
import Accordion from 'react-bootstrap/Accordion';
import { getData } from "../../http/getDataAPI";
import DataTables from "datatables.net-dt";
import { addActionForListPatients ,addActionForListIlls,getRowData, addRow,changeRow, isAccess} from "./utils";
import SetDiagnosis from "../../components/UI/Popups/set_diagnosis/SetDiagnosis";
require("datatables.net-select");
require("datatables.net-responsive");
require("datatables.net-searchpanes");

const getListPatients = async (tablePatientRef,user) =>
{
    if(!user.accountWallet) return undefined;

    let data = await getData("api/get_all_patients");
    data = data.data.data;

    const patients = addActionForListPatients(data,user.user.id);
    //console.log(patients);
    return new DataTables(tablePatientRef.current,
    {
      responsive: true,
      data: patients,
      columns: [
          { data: "num"},
          { data: 'initials' },
          { data: 'mail'},
          { data: 'city' },
          { data: 'action',responsivePriority:1},
          { data: 'list_doc_have_access_to_patient'},
          { data: 'id'},
          { data: 'meta'}
      ],
  
      searchPanes: 
      {
          cascadePanes:true,
          dtOpts:
          {
              // dom:'tp',
              // paging:true,
              // pagingType:'numbers',
              // searching:true,
              info: true
          },
          viewCount: true,
          collapse: true,
          initCollapsed: true,
          layout: 'columns-3',
          // preSelect:[
          //     {
          //         column:4,
          //         rows: [city_patient]
          //     }
          // ]
      },
      dom: 'Plfrtip',
      columnDefs:[
          {
              sClass: css.hide_columns,
              aTargets: [6,7]
          },
          // {
          //     target: -1,
          //     visible: false,
          //     searchable: true,
          // },
          {
              searchPanes:
              {
                  show:true
              },
              targets:[3,5]
          },
          {
              searchPanes:
              {
                  show:false
              },
              targets:[1,2]
          },
          {
              searchPanes: {
                  show:true,
                  options: [
                      {
                          label: 'Назначить диагноз',
                          value: function(rowData, rowIdx) 
                          {
                              return rowData.action.includes('Назначить диагноз');
                          }
                      }
                      // {
                      //     label: 'Имеет доступ',
                      //     value: function(rowData, rowIdx) 
                      //     {
                      //         return rowData.action.includes('Забрать доступ');
                      //     }
                      // }
                  ]
                 // className: 'bord'
              },
              targets: [4]
          },
          // {
          //     searchPanes: {
          //         show:true,
          //         options: [
          //             {
          //                 label: 'Имеется доступ',
          //                 value: function(rowData, rowIdx) 
          //                 {
          //                     if(rowData.list_doc_have_access_to_patient !== null)
          //                         {
          //                             //console.log(rowData.list_doc_have_access_to_patient);
          //                             return rowData.list_doc_have_access_to_patient.includes('61')
          //                         }
          //                     return;
          //                 }
          //             }
                 
          //         ]
          //     },
          //     targets: [5]
          // }
          
      ],
  
      // dom: 'Bfrtip',
      // buttons: [
      //     {
      //         text: 'Profession',
      //         className: 'btn btn-primary dropdown-toggle',
      //         action: function ( e, dt, node, config ) 
      //         {
      //             //$('.dt-button').toggleClass('')
      //         }
      //     }
      // ],
      scrollY: 300,
      scrollX: false,
      deferRender:    true,
      scroller:       true
     // select: true,
      //keys: true
    });
}

const getListIllsPatients = async (tableIllsRef,user) =>
{
  if(!user.accountWallet) return undefined;

  let data = await getData("api/get_all_ill_s_patient",true,{meta:user.accountWallet,queryDoctor:user.user.isDoctor});

  data = data.data.data;
  
  const ills = addActionForListIlls(data,user.user.id);
  return new DataTables(tableIllsRef.current,
    {
      responsive: true,
            data: ills,
            columns: [
              { data: "num"},
              { data: "surname"},
              { data: 'name_ill' },
              { data: 'treatment'},
              { data: 'classification' },
              { data: 'date_ill' },
              { data: 'date_cured'},
              { data: 'status'},
              { data: 'action'},
              { data: 'id'},
              { data: 'id_patient'},
              { data: 'meta'}
            ],
        
            searchPanes: 
            {
                cascadePanes:true,
                dtOpts:
                {
                    info: true
                },
                viewCount: true,
                collapse: true,
                initCollapsed: true,
                layout: 'columns-3',
            },
            dom: 'Plfrtip',
            columnDefs:[
                {
                    sClass: css.hide_columns,
                    aTargets: [9,10,11]
                },
                {
                    searchPanes:
                    {
                        show:true
                    },
                    targets:[4,5,7]
                },
                {
                    searchPanes:
                    {
                        show:false
                    },
                    targets:[0,1,2,3,5,6,8,9,10,11]
                }
                
            ],
            scrollY: 300,
            scrollX: 100,
            deferRender: true,
            scroller: true
    });



}
const ProfileDoctor = () =>
{
    const { user } = useContext(Context);

    const tablePatientRef = useRef();
    const tableIllsRef = useRef();

    const [dt_patients,setDT_patients] = useState();
    const [dt_ills,setDT_ills] = useState();
    const [isOpenPatients,setOpenPatients] = useState(false);
    const [isOpenIlls,setOpenIlls] = useState(false);
    const [showModalSetDiagnosis,setDiagnosisModalShow] = useState(false);
    const [selectedRowData,setSelectedRowData] = useState({});
    const [newDataAboutPatient, setNewDataAboutPatient] = useState(undefined);
    const [changeDiagnosis,setChangeDiagnosis] = useState(false);

    const handleShow = () => setDiagnosisModalShow(true);
    const handleClose = () => setDiagnosisModalShow(false);

    useEffect(()=>
    {
        let idtime;
        function handleClick(event) 
        {
          if(tableIllsRef.current && tablePatientRef.current)
          {
              if(event.target.id === "btn_changeDiagnosis")
              {
                
                //console.log(dt_ills);
                setChangeDiagnosis(true);
                const data = getRowData(event,dt_ills);
                setSelectedRowData(data);
                console.log(data);
                isAccess(data.meta,user).then(access => 
                  {
                    console.log(access);
                    if(access)
                      idtime= setTimeout(()=>
                      {
                        handleShow();
                      },200);
                  })

                
              }
              if(event.target.id === "btn_moreInfo_ill")
              {
                
              }
              if(event.target.id === "btn_action_setDiagnosis")
              {
                
                setChangeDiagnosis(false);
                const data = getRowData(event,dt_patients);
                setSelectedRowData(data);
                console.log(data);
                isAccess(data.meta,user).then(access=>
                  {
                    console.log(access);
                    if(access)
                      idtime= setTimeout(()=>
                      {
                        handleShow();
                      },200);
                  })
                
                
                
              }
          }
        }

        document.addEventListener("click",handleClick);

        return () =>
        {
          document.removeEventListener("click", handleClick);
          clearTimeout(idtime);
        };
    },[tablePatientRef,tableIllsRef,dt_patients,dt_ills,user]);

    useEffect(() =>
    {
      if(!newDataAboutPatient) return;
      if(changeDiagnosis === false)
      {
        const result = newDataAboutPatient.data[0];
        
        addRow(result,user,dt_ills,setNewDataAboutPatient);
      }else
      {
        const result = newDataAboutPatient.data;
        changeRow(result,user,dt_ills,setNewDataAboutPatient);
      }
      
     
       
    },[newDataAboutPatient]);

    return (
        <>
        <main className={css.main}>
         <section id="dataset" className={`${css.dataset} mt-3`}>
           <Accordion >
             <Accordion.Item eventKey="0">
               <Accordion.Header
               onClick={e =>
               {
                  if(isOpenPatients === false)
                  {
                    const d = getListPatients(tablePatientRef,user);
                    d.then((data) =>
                    setDT_patients(data))
                  
                    setOpenPatients(true);
                  }else
                  {
                    if(dt_patients)
                    {
                      dt_patients.responsive.recalc();
                      dt_patients.columns.adjust().responsive.recalc();
                    }else
                      setOpenPatients(false); //TODO: Add button for get new data from server
                  }
                 
               }}>
                   Список Пациентов
               </Accordion.Header>
                 <Accordion.Body>
                   <table className="table table-light display responsive nowrap" style={{width: "100%"}} ref={tablePatientRef}>
                     <thead>
                       <tr>
                         
                       </tr>
                       <tr className="">
                       <th scope="col">#</th>
                        <th scope="col">Initials surname</th>
                        <th scope="col">Mail</th>
                        <th scope="col">City</th>
                        <th scope="col">Action</th>
                        <th scope="col">List doctors</th>
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
                      const d = getListIllsPatients(tableIllsRef, user);
                      d.then((data) =>
                      {
                        console.log(data);
                        if(data)
                        {
                          
                          setDT_ills(data);
                        }

                      });            
                      setOpenIlls(true);
                    }else
                    {
                      if(dt_ills)
                      {
                        dt_ills.responsive.recalc();
                        dt_ills.columns.adjust().responsive.recalc();
  
                      }else
                        setOpenIlls(false); //TODO: Add button for get new data from server
                    }
                   
                 }}>
               Список болезней
               </Accordion.Header>
                 <Accordion.Body>
                   <table className="table table-striped table-light display responsive wrap" style={{width:"100%"}} ref={tableIllsRef}>
                     <thead>
                       <tr className="">
                       <th scope="col">#</th>
                        <th scope="col">Фамилия</th>
                        <th scope="col">Название</th>
                        <th scope="col">Лечение</th>
                        <th scope="col">Классификация</th>
                        <th scope="col">Дата начала лечения</th>
                        <th scope="col">Дата окончания лечения</th>
                        <th scope="col">Статус</th>
                        <th scope="col">Взаимодействие</th>
                        <th scope="col" className={css.hide_columns} >id</th>
                        <th scope="col" className={css.hide_columns} >id_patient</th>
                        <th scope="col" className={css.hide_columns} >meta</th>
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
        <SetDiagnosis 
        show={showModalSetDiagnosis} 
        close={handleClose} 
        changeDiagnosis={changeDiagnosis} 
        title={`${changeDiagnosis ? "Изменить" : "Поставить "} диагноз`} 
        user={user}
        data_patient={selectedRowData}
        setNewDataAboutPatient={setNewDataAboutPatient}/>
         </>
    )
}

export default ProfileDoctor;