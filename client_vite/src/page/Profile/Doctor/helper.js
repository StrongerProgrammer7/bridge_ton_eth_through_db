// @ts-nocheck
import css from './profile_doctor.module.css';
import { getData } from "../../../http/getDataAPI";
import { addActionForListPatients, addActionForListIlls } from "./utils";
import DataTables from "datatables.net";
import 'datatables.net-select'; //require("datatables.net-select");
import "datatables.net-responsive";
import "datatables.net-searchpanes";

const getListData = async (request, data = undefined) =>
{
    const POST = data ? true : false;
    let result = await getData(request, POST, data);
    result = result.data.data;
    return result;
}

export const getListPatients = async (tablePatientRef, user) =>
{
    if (!user.accountWallet) return undefined;

    let data = await getListData("api/get_all_patients");

    const patients = addActionForListPatients(data, user.personalInfo.id);
    //console.log(patients);
    return new DataTables(tablePatientRef.current,
        {
            responsive: true,
            data: patients,
            columns: [
                { data: "num" },
                { data: 'initials' },
                { data: 'mail' },
                { data: 'city' },
                { data: 'action', responsivePriority: 1 },
                { data: 'list_doc_have_access_to_patient' },
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
                // preSelect:[
                //     {
                //         column:4,
                //         rows: [city_patient]
                //     }
                // ]
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
                    targets: [3, 5]
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
                                label: 'Назначить диагноз',
                                value: function (rowData, rowIdx) 
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

            ],

            dom: `P<"${ css.wrapper }"lf>rtip`,
            scrollY: 300,
            scrollX: false,
            deferRender: true,
            scroller: true
        });
}

export const getListIllsPatients = async (tableIllsRef, user) =>
{
    if (!user.accountWallet) return undefined;

    let data = await getListData("api/get_all_ill_s_patient", { meta: user.accountWallet, queryDoctor: user.personalInfo.isDoctor });

    const ills = addActionForListIlls(data, user.personalInfo.id);
    return new DataTables(tableIllsRef.current,
        {
            responsive: true,
            data: ills,
            columns: [
                { data: "num" },
                { data: "surname" },
                { data: 'name_ill' },
                { data: 'treatment' },
                { data: 'classification' },
                { data: 'date_ill' },
                { data: 'date_cured' },
                { data: 'status' },
                { data: 'action' },
                { data: 'id' },
                { data: 'id_patient' },
                { data: 'meta' }
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
                layout: 'columns-3',
            },
            dom: `P<"${ css.wrapper }"lf>rtip`,
            columnDefs: [
                {
                    sClass: css.hide_columns,
                    aTargets: [9, 10, 11]
                },
                {
                    searchPanes:
                    {
                        show: true
                    },
                    targets: [4, 5, 7]
                },
                {
                    searchPanes:
                    {
                        show: false
                    },
                    targets: [0, 1, 2, 3, 5, 6, 8, 9, 10, 11]
                }

            ],
            scrollY: 300,
            deferRender: true,
            scroller: true
        });



}