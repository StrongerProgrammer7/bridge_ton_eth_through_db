

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
    for(let i =0;i<elems.length;i++)
    {
        if(!elems[i].id)
            return undefined;
        if(elems[i].city === object[_key])
            return elems[i].id;
    }
    return undefined;
}

const MySelect = ({labelText,object,_key,setObject,elements,arrKey}) => 
{
    const idElem = getIDElemUser(elements,object,_key);
    return (
        <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">{labelText}</span>
            <select className="form-control" defaultValue={idElem ? `${idElem}` : object[_key]}
            onChange={(e)=>
            {
                object[_key] = e.target.value;
                setObject(object);
            }}>
                {
                    elements.map((elem) =>
                    {
                        
                        if(elem.id)
                        {
                            return getOptionWithId(elem,_key,object,arrKey);
                        }else
                        {
                            return getOptionByKey(elem,_key,object)
                        }
                    })
                }
            </select>
        </div>
    )
}

export default MySelect
