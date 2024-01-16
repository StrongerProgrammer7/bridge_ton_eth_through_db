import { getData, getDataFetch } from '../../../../http/getDataAPI';
import { PROFILEDOCTOR_ROUTER, PROFILE_ROUTE } from '../../../../utils/consts';
export async function signIn(data,user,setLogIn)
{
  if(data.meta=== "")
  {
    console.log("Problem with accout, reload page");
    return;
  }

  console.log(data);
  getDataFetch("api/login",true,data)
  .then((json) =>
  {
    
    if(json.status > 300)
    {
      console.log("Not correct data");
      return;
    }
    return json.json();
   
  }).then(message =>
    {
      console.log("Success");
      console.log(message);
      setTimeout(()=>
      {
        data.isDoctor === false ? window.open(PROFILE_ROUTE,'_self') :  window.open(PROFILEDOCTOR_ROUTER,'_self');
      },3000);
      setLogIn(true);
      window.localStorage.setItem("isAuth","true");
    })
  .catch((error)=>
  {
    console.log("Error with sign up");
  });
}

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