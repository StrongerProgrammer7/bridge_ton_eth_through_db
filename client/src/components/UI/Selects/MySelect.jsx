// @ts-nocheck


import React from 'react'

const getOptionByKey = (elem,personalInfoKey,personalInfo) =>
{
  const select = personalInfo[personalInfoKey] === elem[personalInfoKey];
  return (
    <option  key={elem[personalInfoKey]} value={elem[personalInfoKey]} selected={select}>{elem[personalInfoKey]} </option>
  ) 
}

const getOptionWithId = (elem,personalInfoKey,personalInfo,arrKey) =>
{
    let title = "";
    for(const key of arrKey)
    {
      title += elem[key] + " : ";
    }
    return (
      <option key={elem.id} value={elem.id} >{title}</option>
    )
}

const getIDElemUser = (elems,object,_key) =>
{
    if (elems)
      for(let i =0;i<elems.length;i++)
      {
          if(!elems[i].id)
              return undefined;
          if(elems[i].city === object[_key])
              return elems[i].id;
      }
    return undefined;
}

const debounce = (fn, ms = 300) => 
{
  let timeoutId;
  return function () 
  {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => 
    {
      fn.apply(this, arguments);
    }, ms);
  };
};

const MySelect = ({labelText,formData,_key,setFormData,elements,arrKey}) => 
{
    const debounced = debounce(setFormData, 3000);
    const idElem = getIDElemUser(elements,formData,_key);
    return (
        <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">{labelText}</span>
            <select className="form-control" defaultValue={idElem ? `${idElem}` : formData[_key]}
            onChange={(e)=>
            {
                formData[_key] = e.target.value;
                debounced(formData);
            }}>
                {
                    elements.map((elem) =>
                    {
                        
                        if(elem.id)
                        {
                            return getOptionWithId(elem,_key,formData,arrKey);
                        }else
                        {
                            return getOptionByKey(elem,_key,formData)
                        }
                    })
                }
            </select>
        </div>
    )
}

export default MySelect
