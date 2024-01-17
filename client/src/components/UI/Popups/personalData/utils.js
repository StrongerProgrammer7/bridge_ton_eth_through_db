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
        console.log(data);
        
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

export async function getDataAboutDoctor(meta)
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
export async function getCities()
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