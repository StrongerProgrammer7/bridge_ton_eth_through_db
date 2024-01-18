

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