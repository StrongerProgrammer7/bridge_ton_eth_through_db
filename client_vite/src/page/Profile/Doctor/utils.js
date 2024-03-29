import { isExistsData, isDoctorHaveAccess, createButton, getReadyDate } from "../total_utlls";

export function createButtonForAccess(list_doctors_have_access, id)
{
    let button = `<div class='btn-group'>`;
    if (list_doctors_have_access && isDoctorHaveAccess(list_doctors_have_access, id) > -1)
        button += createButton('btn btn-success btn-sm', 'btn_action_setDiagnosis', 'Назначить диагноз');
    button += createButton('btn btn-primary btn-sm', 'btn_moreInfo', 'О пациенте') + `</div>`;
    return button;
}
export function addActionForListPatients(data, id_doctor)
{
    for (let i = 0; i < data.length; i++)
        data[i].action = createButtonForAccess(data[i].list_doc_have_access_to_patient, id_doctor);

    return data;
}

export function addActionForListIlls(data, id_doctor)
{
    if (!data) return [];

    for (let i = 0; i < data.length; i++)
    {
        data[i].num = i + 1;
        data[i].action = `<div class='btn-group'>`

        if (data[i].status.includes('ill') === true && data[i].list_doc.includes(id_doctor) === true &&
            (data[i].id_doctor === id_doctor || data[i].list_doc.includes(data[i].id_doctor) === false))
            data[i].action += createButton('btn btn-primary btn-sm', 'btn_changeDiagnosis', 'Изменить диагноз');

        data[i].action += createButton('btn btn-info btn-sm', 'btn_moreInfo_ill', 'Больше информации');
        data[i].action += `</div>`;

        if (isExistsData(data[i], 'date_cured'))
            data[i].date_cured = getReadyDate(data[i].date_cured);

        if (isExistsData(data[i], 'date_ill'))
            data[i].date_ill = getReadyDate(data[i].date_ill);
    }
    return data;
}

export async function isAccess(meta_patient, user)
{

    if (!user.contract || user.accountWallet === '' || !meta_patient) return false;
    return await user.contract.methods.checkAccess(meta_patient, user.accountWallet)
        .call({ from: user.accountWallet })
        .then(isAccess =>
        {
            return isAccess;
        })
        .catch((error) =>
        {
            console.error(error);
            if (error.message)
                console.log(error.message);
            if (error.data.message)
                console.log(error.data.message);
            else
            {
                let start = error.message.indexOf("message");
                console.log(error.message.slice(start - 1, error.message.indexOf("\",", start)));
            }


        });

}

export function addRow(data, user, dt_ills, setNewDataAboutPatient)
{
    if (!dt_ills)
        return;

    data.action = `<div class='btn-group'>`

    if (data.status.includes('ill') === true && data.list_doc.includes(user.personalInfo.id) === true)
        data.action += createButton('btn btn-primary btn-sm', 'btn_changeDiagnosis', 'Изменить диагноз');
    if (isExistsData(data, 'date_cured'))
        data.date_cured = `${ new Date(data.date_cured).toISOString().slice(0, 10) + ' ' + new Date(data.date_cured).toISOString().slice(11, 19) }`

    if (isExistsData(data, 'date_ill'))
        data.date_ill = `${ new Date(data.date_ill).toISOString().slice(0, 10) + ' ' + new Date(data.date_ill).toISOString().slice(11, 19) }`
    data.action += createButton('btn btn-info btn-sm', 'btn_moreInfo_ill', 'Больше информации');
    data.action += `</div>`;

    const count_ills = dt_ills.rows().count();
    dt_ills.row.add(
        {
            "num": count_ills + 1,
            "surname": data.surname,
            'name_ill': data.name_ill,
            'treatment': data.treatment,
            'classification': data.classification,
            'date_ill': data.date_ill,
            'date_cured': data.date_cured,
            'status': data.status,
            'action': data.action,
            'id': data.id,
            'id_patient': data.id_patient,
            'meta': data.meta
        }
    ).draw();
    setNewDataAboutPatient(undefined);
}

export function changeRow(result, dt_ills, setNewDataAboutPatient)
{
    if (!dt_ills) return;
    console.log(result);

    if (isExistsData(result, 'date_cured'))
        result.date_cured = getReadyDate(result.date_cured);;

    if (isExistsData(result, 'date_ill'))
        result.date_ill = getReadyDate(result.date_ill);

    if (result.status === "Cured")
    {
        result.action = `<div class='btn-group'>`;
        result.action += createButton('btn btn-info btn-sm', 'btn_moreInfo_ill', 'Больше информации');
        result.action += `</div>`;
    }

    dt_ills.row(result.num - 1).data(result).draw();
    setNewDataAboutPatient(undefined);
}

export function isExistsAcessShowModal(idtime, meta, user, handleShow)
{
    isAccess(meta, user)
        .then(access => 
        {
            //console.log(access);
            if (access)
                idtime = setTimeout(() =>
                {
                    handleShow();
                }, 200);
        })
}