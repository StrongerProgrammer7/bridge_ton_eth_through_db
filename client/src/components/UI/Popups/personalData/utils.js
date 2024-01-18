import { getData } from '../../../../http/getDataAPI';



export async function changeData(data)
{
    console.log(data);
    // return getData("api/update_pesonalInfo_patient",true,data)
    // .then((data) =>
    // {
    //     console.log(data);
    // })
    // .catch(error => console.log("Error with change data patient"));
}

export async function getDataAboutPatient(meta)
{
    return getData("api/get_all_personalInfo_patient",true,{meta})
    .then((data) =>
    {
        //console.log(data);
        
        if(data.data && data.data.data &&  data.data.data.length !== 0)
        {
            const info = data.data.data[0];
            info.datebirthd = (new Date(info.datebirthd)).toISOString().slice(0,10)
            return info;
        }
        return {};
    })
    .catch((error)=>
    {
        console.log("Error with get personal data");
    })
}

async function getDataAboutDoctor(meta)
{
  return getData("api/get_all_personalInfo_doctor",true,{meta})
  .then((data) =>
  {
    if(data.data.data)
      return data.data.data;
    else
      return {};
  })
  .catch((error) =>
  {
    console.log("Error with get personal info doctor");
  })
}
async function getCities()
{
    return getData("api/get_cities")
    .then((data)=>
    {
        if(data.data && data.data.length !==0)
            return data.data.data;
        return [];
    })
    .catch(()=>
    {
        console.log("Error with get cities");
    })
}

export async function getPersonalInfo(wallet,user,propsSet)
{
  if(user.user.isDoctor === false)
  {
    const data = await getDataAboutPatient(wallet);
    const cities = await getCities();
    //console.log(cities);
    propsSet.setPersonalInfo(data);
    propsSet.setCities(cities);
    user.addExtraData("extra",data);
  }else
  {
    Promise.all([
        await getDataAboutDoctor(wallet),
        await getData("api/get_contacts_doctors"),
        await getData("api/get_all_categories_doctors"),
        await getData("api/get_hospitals"),
        await getData("api/get_all_profession_doctors"),
        ])
        .then(results =>
        {
            console.log(results);
            propsSet.setPersonalInfo(results[0][0]);
            propsSet.setContacts(results[1].data.data);
            propsSet.setCategories(results[2].data.data);
            propsSet.setHospitals(results[3].data.data);
            propsSet.setProfessions(results[4].data.data);
            user.addExtraData("extra",results[0][0]);
            
        })
        .catch(error=>console.log(error))
    }
}