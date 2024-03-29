// @ts-nocheck
import React, { useState } from 'react';
import { Context } from '../main';

export const UserContext = ({ children }) => 
{
    const [isLoading, setLoading] = useState(true);
    
    const data = {
        setLoading,  
        isLoading,
    };

  
  return (
	<Context.Provider value={data}>
		{children}
	</Context.Provider>
  )
};