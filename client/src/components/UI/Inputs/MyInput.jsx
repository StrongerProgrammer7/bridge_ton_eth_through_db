// @ts-nocheck

import React from 'react'

function trimSpaces(input)
{
  return input.trim();
}
const debounce = (fn, ms = 300, setLoading = null) => 
{
  let timeoutId;
  return function () 
  {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => 
    {
      fn.apply(this, arguments);
      if (setLoading) setLoading(false);
    }, ms);
    if (setLoading) setLoading(true);
  };
};

const MyInput = ({ labelText, type, formData, _key, setChangeObject, placeholderText = '', _required = false, _disabled = false }) => 
{
  
  const debounced = debounce(setChangeObject, 3000);
  return (
    <div className="input-group input-group-sm mb-2">
        <span className="input-group-text" id="inputGroup-sizing-sm">{labelText}</span>
        <input type={type} 
        className="form-control" 
        placeholder={placeholderText} 
        defaultValue={ formData[_key] }
        disabled={_disabled}
        required={_required}
        onClick={e =>
            {
              formData[_key] = trimSpaces(e.target?.value);
              debounced(formData);
            }
        }/>
    </div>
  )
}

export default MyInput
