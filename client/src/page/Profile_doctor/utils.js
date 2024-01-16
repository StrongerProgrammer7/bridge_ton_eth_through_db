
const findTr = (event) =>
{
  const max_deep = 10;
  let count = 0;
  while(true)
  {
    count++;
    if(count < max_deep && event.nodeName.toLowerCase() === "tr")
      return event;
    else
      event = event.parentNode;

    if(!event)
      break;
  }
  return undefined;
}

export const getRowData = (event,dt) =>
{
    let  data = dt?.row(event.target).data();
    if(!data)
    {
        let tr = findTr(event.target);
        if(!tr)
        {
            console.log("Tr not find, error with role");
            throw new Error("Tr not find");
        }
        data = dt?.row(tr).data();
    }
    return data;
}



export function addActionForListPatients(data,id_doctor)
{
    for(let i =0;i<data.length;i++)
    {
       // console.log(data[i])
        data[i].action = `
        <div class='btn-group'>`;
        if(data[i].list_doc_have_access_to_patient!==null)
        {
            if(data[i].list_doc_have_access_to_patient.indexOf(id_doctor) > -1)
            {
                data[i].action += `<button class='btn btn-success btn-sm' id='btn_action_setDiagnosis'>Назначить диагноз</button>`
            }
        }
        data[i].action +=`<button class='btn btn-primary btn-sm' id='btn_moreInfo'>О пациенте</button></div>`
    }
    return data;
}

function isExistsDateCured(date_cured)
{
    return date_cured!== undefined && date_cured!==null && date_cured!== "" ;
}
function isExistsDateIll(date_ill)
{
    return  date_ill!==undefined && date_ill!==null && date_ill!== "";
}

export function addActionForListIlls(data,id_doctor)
{
    if (!data) return [];
    
    for(let i =0;i<data.length;i++)
    {
        data[i].num = i+1;
        data[i].action = `<div class='btn-group'>`

        if(data[i].status.includes('ill')===true && data[i].list_doc.includes(id_doctor)===true && data[i].id_doctor === id_doctor)
        {
            data[i].action += `<button class='btn btn-primary btn-sm' id='btn_changeDiagnosis'>Изменить диагноз</button>`;    
        }else
        {
            if(data[i].status.includes('ill')===true && data[i].list_doc.includes(id_doctor)===true && data[i].list_doc.includes(data[i].id_doctor)===false)
                data[i].action += `<button class='btn btn-primary btn-sm' id='btn_changeDiagnosis'>Изменить диагноз</button>`;
        }

        data[i].action += `<button class='btn btn-info btn-sm' id='btn_moreInfo_ill'>Больше информации</button>`
        data[i].action += `</div>`;

        if(isExistsDateCured(data[i].date_cured))
            data[i].date_cured = `${ new Date(data[i].date_cured).toISOString().slice(0,10) + ' ' + new Date(data[i].date_cured).toISOString().slice(11,19)}`

        if(isExistsDateIll(data[i].date_ill))
            data[i].date_ill = `${  new Date(data[i].date_ill).toISOString().slice(0,10) + ' ' + new Date(data[i].date_ill).toISOString().slice(11,19)}`
    }
    return data;
}

export async function isAccess(meta_patient,user)
{

    if(!user.contract || user.accountWallet === '' || !meta_patient) return false;
    return await user.contract.methods.checkAccess(meta_patient,user.accountWallet)
    .call({from : user.accountWallet})
    .then(isAccess =>
    {
        return isAccess;

        // user.contract.getPastEvents("allEvents",
        // {                               
        //     fromBlock: 'latest',     
        //     toBlock: 'latest'     
        // }).then((events) => console.log(events))
        // .catch((err) =>console.error(err));
    })
    .catch((error)=>
    {
        console.error(error);
        let start = error.message.indexOf("message");
        console.log( error.message.slice(start-1,  error.message.indexOf("\",",start)) );

    });      
    
}

export function addRow(data,user,dt_ills,setNewDataAboutPatient)
{
    if(!dt_ills)
        return;

    data.action = `<div class='btn-group'>`

    if(data.status.includes('ill')===true && data.list_doc.includes(user.user.id)===true)
        data.action += `<button class='btn btn-primary btn-sm' id='btn_changeDiagnosis'>Изменить диагноз</button>`; 
    if(isExistsDateCured(data.date_cured))
        data.date_cured = `${ new Date(data.date_cured).toISOString().slice(0,10) + ' ' + new Date(data.date_cured).toISOString().slice(11,19)}`
        
    if(isExistsDateIll(data.date_ill))
        data.date_ill = `${  new Date(data.date_ill).toISOString().slice(0,10) + ' ' + new Date(data.date_ill).toISOString().slice(11,19)}`
    data.action += `<button class='btn btn-info btn-sm' id='btn_moreInfo_ill'>Больше информации</button>`
    data.action += `</div>`;

    const count_ills = dt_ills.rows().count();
    dt_ills.row.add(
        {
            "num": count_ills + 1,
            "surname": data.surname,
            'name_ill' : data.name_ill,
            'treatment': data.treatment,
            'classification': data.classification,
            'date_ill' : data.date_ill,
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

export function changeRow(result,user,dt_ills,setNewDataAboutPatient)
{
    if(!dt_ills) return;
    console.log(result);

    if(isExistsDateCured(result.date_cured))
        result.date_cured = `${ new Date(result.date_cured).toISOString().slice(0,10) + ' ' + new Date(result.date_cured).toISOString().slice(11,19)}`;
        
    if(isExistsDateIll(result.date_ill))
        result.date_ill = `${  new Date(result.date_ill).toISOString().slice(0,10) + ' ' + new Date(result.date_ill).toISOString().slice(11,19)}`;

    if(result.status === "Cured")
    {
        result.action = `<div class='btn-group'>`;
        result.action += `<button class='btn btn-info btn-sm' id='btn_moreInfo_ill'>Больше информации</button>`;
        result.action += `</div>`;
    }

    dt_ills.row(result.num-1).data(result).draw();
    setNewDataAboutPatient(undefined);
}