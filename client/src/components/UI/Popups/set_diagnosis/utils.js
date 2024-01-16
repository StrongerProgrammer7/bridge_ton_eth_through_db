import { getData } from '../../../../http/getDataAPI';


export const getTotalDataAboutDiagnosis = async () =>
{
    return Promise.all([
        await getData("api/get_all_classificationIlls"),
        await getData("api/get_all_name_ills"),
    ])
    .then(results =>
    {
        console.log(results);
        const name_ill = results[1].data.data;
        const classification = results[0].data.data;
        return {name_ill,classification};
        
    })
    .catch(error=>console.log(error))
}

export const setDiagnosis = async (data,changeDiagnosis,accountWallet) =>
{
    const date_cured = data.date_cured || "";
    
    const prepareData = 
    {
        treatment:data.treatment,
        classification:data.classification,
        date_ill:data.date_ill,
        date_cured,
        meta:accountWallet,
        id_patient:data.id,
        status:data.status,
        name_ill:data.name_ill,
        id_ill:data.id
    }
    if(changeDiagnosis)
    {
        const result = await getData("api/update_diagnosis",true,prepareData);
        return result.data;
    }else
    {
        const result = await getData("api/set_diagnosis",true,prepareData);
        return result.data;
    }
}
