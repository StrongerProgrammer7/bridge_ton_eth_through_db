
export function createButton(class_text, id, text)
{
  return `<button class='${ class_text }' id='${ id }'>${ text }</button>`;
}

/**
 * @param {{ responsive: { recalc: () => void; }; columns: { adjust: () => { (): any; new (): any; responsive: { (): any; new (): any; recalc: { (): void; new (): any; }; }; }; }; }} dt
 * @param {number | undefined} ms
 */
export function recalcTable(dt, ms)
{
  setTimeout(() =>
  {
    console.log("Recal datatable...");
    dt.responsive?.recalc();
    dt.columns?.adjust().responsive.recalc();
  }, ms)
}

const findTr = (event) =>
{
  const max_deep = 10;
  let count = 0;
  while (true)
  {
    count++;
    if (count < max_deep && event.nodeName.toLowerCase() === "tr")
      return event;
    else
      event = event.parentNode;

    if (!event)
      break;
  }
  return undefined;
}

export const getRowData = (event, dt) =>
{
  console.log(dt);
  console.log(event.target);
  let data = dt.row(event.target).data();
  if (!data)
  {
    let tr = findTr(event.target);
    if (!tr)
    {
      console.log("Tr not find, error with role");
      throw new Error("Tr not find");
    }
    data = dt.row(tr).data()
  }
  return data;
}

export const isExistsData = (data, key) =>
{
  return data[key] !== null && data[key] !== undefined && data[key] !== "";
}

export const isExistsDatas = (data, keys = []) =>
{
  for (let i = 0; i < keys.length; i++)
  {
    if (data[keys[i]] === null || data[keys[i]] === undefined || data[keys[i]] === '')
      return false;
  }
  return true;
}

export function isDoctorHaveAccess(list, id)
{
  return list.indexOf(`${ id }`);
}

export function getReadyDate(date)
{
  return `${ new Date(date).toISOString().slice(0, 10) + ' ' + new Date(date).toISOString().slice(11, 19) }`
}

export function setDatatablesValues(result, setDT)
{
  result.then((data) =>
  {
    console.log(data);
    if (data)
    {
      setDT(data);
    }
  });
}
export function openTab(isOpenCurrentTab, getListDataCallback, dataTable, user, dispatch = null)
{
  if (isOpenCurrentTab === false)
  {
    if (dataTable.dt)
    {
      recalcTable(dataTable.dt, 200);
    } else
    {
      console.log(dataTable);
      let result;
      if (dispatch)
        result = getListDataCallback(dataTable.dtRef, user, dispatch);
      else
        result = getListDataCallback(dataTable.dtRef, user);

      setDatatablesValues(result, dataTable.setDT);
      dataTable.setOpenTab(true);
    }


  } else
  {
    dataTable.setOpenTab(false);
  }
}