import { $host } from ".";

const request = async (query, POST = false, data = {}) =>
{
    try
    {
        if (POST)
        {
            return await $host.post(query,
                {
                    ...data
                },
                {
                    withCredentials: true
                });
        } else
            return await $host.get(query);
    }
    catch (error) 
    {
        console.error(error);
        if (error.message)
            console.log(error.message);
        throw error;
    }
}
export const postData = async (query, data) =>
{
    const response = await request(query, true, data);
    return response;
}

export const getData = async (query, POST = false, data = {}) =>
{
    const response = await request(query, POST, data);
    return response;
}

//Using fetch and proxy so as not set cookie if using axios
export const getDataFetch = async (query, POST = false, data = {}) =>
{
    let response = undefined;
    try 
    {
        if (POST)
        {
            response = await fetch(query,
                {
                    method: "POST",
                    credentials: "include",
                    headers:
                    {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ ...data }),
                });
        } else
            response = await fetch(query,
                {
                    method: "GET",
                    credentials: "include",
                    headers:
                    {
                        "Content-Type": "application/json"
                    }
                });
        return response;
    } catch (error) 
    {
        console.error(error);
        if (error.message)
            console.log(error.message);
        throw error;
    }
}