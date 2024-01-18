import { getData, postData } from "../../../http/getDataAPI";
import {changeButton,addActionForListDoctors} from "./utils";
import {  isExistsDatas } from '../total_utlls';

async function updatelistDoctorsInDB(list_doctors,table_doctors,accountWallet,button)
{
    postData("api/update_list_doctors",{meta:accountWallet,list_doctors_have_access:list_doctors})
    .then((data)=>
    {
        if(button.id === "btn_action_giveAccess")
        {
            changeButton(button,'btn-info','btn-danger','btn_action_revokeAccess','Забрать доступ');
            addActionForListDoctors(table_doctors.data(),list_doctors);
            table_doctors.draw();
        }else
        {
            changeButton(button,'btn-danger','btn-info','btn_action_giveAccess','Дать доступ');
            addActionForListDoctors(table_doctors.data(),list_doctors);
            table_doctors.draw();
        }
    })
    .catch(error=> console.log("Error with update DB"));
}

function updateListDoctorsByContractMethod(user,name_method,meta_person)
{
    return user.contract.methods[name_method](meta_person).send({from :user.accountWallet})
    .then((res) =>
    {
        user.contract.getPastEvents("allEvents",
        {                               
            fromBlock: 'latest',     
            toBlock: 'latest'     
        })
        .then((events) => 
        {
            console.log(events);
        })
        .catch((err) => console.error(err));
    })
    .catch((error) =>
    {
        console.log("Error with work contract");
        console.error(error);
    })
}
export async function updateListDoctorsGiveRole(id_doctor,meta_doctor,user,dt,button)
{
    console.log("update",id_doctor,meta_doctor,button);
    if(!isExistsDatas({id_doctor,meta_doctor},['id_doctor','meta_doctor']))
    {
        console.log("Data is not correct");
        return;
    }
    updateListDoctorsByContractMethod(user,'giveRole',meta_doctor)
    .then(async () =>
    {
        user.pushList_doctors(id_doctor);
        console.log(user.listDoctors);
        let temp_list = user.listDoctors.toString();
        updatelistDoctorsInDB(temp_list,dt,user.accountWallet,button);
    })
    .catch((err) =>
    {
        console.log('Error with contract or user denied',err);
    });    
    
}

export async function updateListDoctorsRevokeRole(id_doctor,meta_doctor,user,dt,button)
{
    if(!isExistsDatas({id_doctor,meta_doctor},['id_doctor','meta_doctor']))
    {
        console.log("Data is not correct");
        return;
    }
    
    updateListDoctorsByContractMethod(user,'anualRole',meta_doctor) 
    .then(async () =>
    {
        const index = user.listDoctors.indexOf(id_doctor);
        if(index === -1) return;
        let _list = user.listDoctors;
        _list.splice(index,1);
        const _list_str = _list.toString();
        user.setNewListDoctors(_list);

        updatelistDoctorsInDB(_list_str,dt,user.accountWallet,button);
    })
    .catch((err) =>
    {
        console.log('Error with contract or user denied',err);
    });
    
}

export async function getListIllsPatients(accountWallet,queryDoctor=false)
{
    try
    {
        return await getData("api/get_all_ill_s_patient",true,{meta:accountWallet,queryDoctor});
    }catch(err)
    {
        console.log("Error: getListIllsPatients")
        return [];
    }
    
}

export async function getListActualIllsPatients(accountWallet)
{
    try
    {
        return await getData("api/get_all_actuaIllPatient",true,{meta:accountWallet});
    }catch(err)
    {
        console.log("Error: getListActualIllsPatients")
        return [];
    }
}


export async function getListAllDoctors(accountWallet)
{
    return Promise.all([
        await getData("api/getCity",true,{meta:accountWallet}),
        await getData("api/get_all_doctors"),
        await getData("api/get_list_doctors_haveAccess",true,{meta:accountWallet})
    ])
    .catch(err =>
    {
        console.log("Error: getListAllDoctors");
    })
}
