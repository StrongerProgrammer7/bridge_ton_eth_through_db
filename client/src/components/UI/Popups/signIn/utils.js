import { getDataFetch } from "../../../../http/getDataAPI";
import { PROFILEDOCTOR_ROUTER, PROFILE_ROUTE } from "../../../../utils/consts";
import { setLocalStorageItem } from "../../../../utils/helper";


/**
 * @param {{meta,isDoctor,password}} data
 * @param {(callback) => void} setLogIn - useState
 */
export async function signIn(data,setLogIn)
{
    if(data.meta=== "")
    {
        console.log("Problem with accout, reload page");
        return;
    }

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
        console.log("Success sign in: ", message);
        setTimeout(()=>
        {
            data.isDoctor === false ? window.open(PROFILE_ROUTE,'_self') :  window.open(PROFILEDOCTOR_ROUTER,'_self');
        },1000);
        setLogIn(true);
        setLocalStorageItem("isAuth","true");
    })
    .catch((error)=>
    {
        console.log("Error with sign up");
        console.error(error)
    });
}