import { getDataFetch } from "../../../../http/getDataAPI";
import { UserControls } from "../../../../models/user";
import { PROFILEDOCTOR_ROUTER, PROFILE_ROUTE } from "../../../../utils/consts";
import { setLocalStorageItem } from "../../../../utils/helper";


export async function signIn(data, dispatch)
{
    if (data.meta === "")
    {
        console.log("Problem with account, reload page");
        return;
    }
    let timeId = null;
    getDataFetch("api/login", true, data)
        .then((data) =>
        {
            if (data.status > 300)
            {
                console.log("Not correct data");
                return;
            }
            return data.json();

        }).then(message =>
        {
            if (!message)
                return;

            console.log("Success sign in: ", message);
            timeId = setTimeout(() =>
            {
                data.isDoctor === false ? window.open(PROFILE_ROUTE, '_self') : window.open(PROFILEDOCTOR_ROUTER, '_self');
            }, 1000);
            dispatch(UserControls.setAuth(true));
            setLocalStorageItem("isAuth", "true");
        })
        .catch((error) =>
        {
            console.log("Error with sign up");
            console.error(error);
            if (timeId !== null)
                clearTimeout(timeId);
        });
}