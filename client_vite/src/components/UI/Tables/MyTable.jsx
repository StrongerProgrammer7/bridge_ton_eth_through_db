
import React from 'react'

const MyTable = ({tableRef,idTableBody,ths,...props}) => 
{
    return (
        <table className="table table-light display responsive nowrap" style={{width: "100%"}} ref={ tableRef } >
        <thead>
          <tr className="">
            {ths.map(th =>
                {
                    return (
                        <th scope="col" key={th.name} className={th.classname}>{th.name}</th>            
                    )
                })}
          </tr>
        </thead>
        <tbody id={idTableBody}>
        </tbody>
         <tfoot>
          <tr className="">
            {ths.map(th =>
                {
                    return (
                        <th scope="col" key={th.name} className={th.classname}>{th.name}</th>            
                    )
                })}
          </tr>
        </tfoot>
      </table>
    )
}

export default MyTable
