
export function createButton(class_text,id,text)
{
    return `<button class='${class_text}' id='${id}'>${text}</button>`;
}

export function recalcTable(dt,ms)
{
    setTimeout(()=>
    {   
        dt.responsive.recalc();
        dt.columns.adjust().responsive.recalc();
    },ms)
}

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
    let  data = dt.row(event.target).data();
    if(!data)
    {
        let tr = findTr(event.target);
        if(!tr)
        {
            console.log("Tr not find, error with role");
            throw new Error("Tr not find");
        }
        data = dt.row(tr).data()
    }
    return data;
}

export const isExistsData = (data,key) =>
{
    return data[key] !== null && data[key] !== undefined && data[key] !== "";
}

export const isExistsDatas = (data,keys=[]) =>
{
  for(let i =0;i<keys.length;i++)
  {
    if(data[keys[i]] === null || data[keys[i]] === undefined || data[keys[i]] === '')
      return false;
  }
  return true;
}

export function isDoctorHaveAccess(list,id)
{
    return list.indexOf(`${id}`);
}

export function getReadyDate(date)
{
  return `${  new Date(date).toISOString().slice(0,10) + ' ' + new Date(date).toISOString().slice(11,19)}`
}

export function setDatatablesValues(result,setDT)
{
  result.then((data) =>
  {
    console.log(data);
    if(data)
    {
      setDT(data);
    }
  });            
}
export function openTab(isOpenCurrentTab,getListDataCallback,dataTable,user)
{
  if(isOpenCurrentTab === false)
  {
    const result = getListDataCallback(dataTable.dtRef,user);
    setDatatablesValues(result,dataTable.setDT);                   
    dataTable.setOpenTab(true);
  }else
  {
    if(dataTable.dt)
    {
      recalcTable(dataTable.dt,200);  
    }else
    dataTable.setOpenTab(false); //TODO: Add button for get new data from server
  }
}