import { getData } from "./getDataAPI";

export const getDataOfContract = async () =>
{
    let response = undefined;
    try
    {
        response = await getData('api/getABIandAddress');
        return response;
    }catch(err)
    {
        console.log('Error with get data ABI and Address');
        console.error(err);
        if(err.message)
        {
            console.log(err.message);
            response = { status: 500, message: err.message};
        }

        if(err.response)
            response = err.response;    
    }
    finally
    {
        return response;
    }
    
}
