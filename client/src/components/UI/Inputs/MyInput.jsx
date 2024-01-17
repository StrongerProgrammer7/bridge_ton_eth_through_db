// @ts-nocheck

import React from 'react'

const MyInput = ({labelText,type,object,_key,setChangeObject,placeholderText='',_required=false,_disabled=false}) => {
  return (
    <div className="input-group input-group-sm mb-2">
        <span className="input-group-text" id="inputGroup-sizing-sm">{labelText}</span>
        <input type={type} 
        className="form-control" 
        placeholder={placeholderText} 
        defaultValue={ object[_key] }
        disabled={_disabled}
        required={_required}
        onClick={e =>
            {
                object[_key] = e.target?.value;
                setChangeObject(object);
            }
        }/>
    </div>
  )
}

export default MyInput
