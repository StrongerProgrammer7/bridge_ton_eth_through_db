// @ts-nocheck
import css from './profile.module.css';
import { getListActualIllsPatients, getListAllDoctors, getListIllsPatients } from "./helper";
import { isExistsData, createButton, isDoctorHaveAccess, getReadyDate } from '../total_utlls';
import DataTables from "datatables.net-dt";

import { UserControls } from '../../../models/user';
require("datatables.net-select");
require("datatables.net-responsive");
require("datatables.net-searchpanes");




export function createButtonForAccess(list_doctors_have_access, id)
{
    let button = `<div class='btn-group'>`;
    if (isDoctorHaveAccess(list_doctors_have_access, id) > -1)
        button += ` ${ createButton("btn btn-danger btn-sm", "btn_action_revokeAccess", "Забрать доступ") }`
    else
        button += `${ createButton("btn btn-info btn-sm", "btn_action_giveAccess", "Дать доступ") }`
    button += createButton("btn btn-primary btn-sm", "btn_moreInfo", "О враче") + `</div>`
    return button;
}

export function addActionForListDoctors(data, list_doctors_have_access = '')
{
    if (!data) return data;

    for (let i = 0; i < data.length; i++)
        data[i].action = createButtonForAccess(list_doctors_have_access, data[i].id);

    return data;
}

function addActionForListIlls(listIlls_object)
{
    if (!listIlls_object) return undefined;
    let data = listIlls_object;
    for (let i = 0; i < data.length; i++)
    {
        data[i].num = i + 1;
        data[i].action = createButton("btn btn-info btn-sm", "btn_moreInfo_ill", "Больше информации");
        if (isExistsData(data[i], 'date_cured'))
            data[i].date_cured = getReadyDate(data[i].date_cured)

        if (isExistsData(data[i], 'date_ill'))
            data[i].date_ill = getReadyDate(data[i].date_ill);
    }
    return data;

}

export function changeButton(button, deleteClass, addClass, newId, textContent)
{
    button.classList.remove(deleteClass);
    button.classList.add(addClass);
    button.id = newId;
    button.textContent = textContent;
}


export async function getTableActualIll(tableActualIllsRef, user)
{
    if (user.accountWallet === '') return;
    const data_ills = await getListActualIllsPatients(user.accountWallet);
    const ills = addActionForListIlls(data_ills.data.data);
    const dt_actualIlls = new DataTables(tableActualIllsRef.current,
        {
            responsive: true,
            data: ills,
            columns: [
                { data: "num" },
                { data: 'name_ill' },
                { data: 'treatment' }
            ],
            columnDefs:
                [
                    {
                        className: css.red_color_text,
                        target: 0
                    }

                ],
            scrollY: 300,
            scrollX: 100,
            deferRender: true,
            scroller: true

        });
    dt_actualIlls
        .rows(function (idx, data, node) 
        {
            return (data.status.includes('ill') !== true && data.status.includes('Болен') !== true);
        }).remove().draw();
    dt_actualIlls.responsive.recalc();
    dt_actualIlls.columns.adjust().responsive.recalc();

    return dt_actualIlls;
}

export async function getTableAllIlls(tableIllsRef, user, dispatch = null)
{
    if (user.accountWallet === '') return;
    const data_ills = await getListIllsPatients(user.accountWallet);

    //console.log(data_ills.data.data);
    const ills = addActionForListIlls(data_ills.data.data);
    //console.log(ills);
    const dt_ills = new DataTables(tableIllsRef.current,
        {
            responsive: true,
            data: ills,
            columns: [
                { data: "num" },
                { data: 'name_ill' },
                { data: 'treatment' },
                { data: 'classification' },
                { data: 'date_ill' },
                { data: 'date_cured' },
                { data: 'status' },
                { data: 'action' },
                { data: 'id' }
            ],

            searchPanes:
            {
                cascadePanes: true,
                dtOpts:
                {
                    info: true
                },
                viewCount: true,
                collapse: true,
                initCollapsed: true,
                layout: 'columns-2',
            },
            dom: 'Plfrtip',
            columnDefs: [
                {
                    sClass: css.hide_columns,
                    aTargets: [8]
                },
                {
                    searchPanes:
                    {
                        show: true
                    },
                    targets: [3, 6]
                },
                {
                    searchPanes:
                    {
                        show: false
                    },
                    targets: [0, 1, 2, 4, 5, 7]
                }

            ],
            scrollY: 300,
            scrollX: 100,
            deferRender: true,
            scroller: true
        });
    return dt_ills;
}

export async function getTableAllDoctors(tableDoctorRef, user, dispatch)
{
    if (user.accountWallet === '') return undefined;

    const results = await getListAllDoctors(user.accountWallet);
    //console.log(results);
    const city = results[0].data.data;
    const data = results[1].data.data;
    const list_doc_have_access = results[2].data.data[0].list_doc;
    const doctors = addActionForListDoctors(data, list_doc_have_access);
    dispatch(UserControls.setNewListDoctor(list_doc_have_access.split(",")));
    return new DataTables(tableDoctorRef.current,//$(tableRef.current).DataTable(
        {
            responsive: true,
            data: doctors,
            columns: [
                { data: "num" },
                { data: 'initials' },
                { data: 'mail' },
                { data: 'profession' },
                { data: 'city' },
                { data: 'action' },
                { data: 'id' },
                { data: 'meta' }
            ],

            searchPanes:
            {
                cascadePanes: true,
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
                preSelect: [
                    {
                        column: 4,
                        rows: [city]
                    }
                ]
            },
            dom: 'Plfrtip',
            columnDefs: [
                {
                    sClass: css.hide_columns,
                    aTargets: [6, 7]
                },
                {
                    searchPanes:
                    {
                        show: true
                    },
                    targets: [3, 4]
                },
                {
                    searchPanes:
                    {
                        show: false
                    },
                    targets: [1, 2]
                },
                {
                    searchPanes: {
                        show: true,
                        options: [
                            {
                                label: 'Не имеет доступ',
                                value: function (rowData, rowIdx) 
                                {
                                    return rowData.action.includes('Дать доступ');
                                }
                            },
                            {
                                label: 'Имеет доступ',
                                value: function (rowData, rowIdx) 
                                {
                                    return rowData.action.includes('Забрать доступ');
                                }
                            }
                        ]
                        // className: 'bord'
                    },
                    targets: [5]
                }

            ],

            scrollY: 300,
            scrollX: false,
            deferRender: true,
            scroller: true


        });

}
