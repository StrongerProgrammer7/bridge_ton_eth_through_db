// @ts-nocheck
import Web3 from 'web3';
import * as abi from '../../../http/ABIandAddress';
import { getData } from '../../../http/getDataAPI';

export const connectMetamask = async (user,setIsRegistered,setSwitchOn=null) =>
{
    try 
    {
      const web3 = await new Web3(window.ethereum);
      const accounts = await web3.eth.requestAccounts();
      
      if(!accounts)
      {
        console.log("Not connect with wallet or not exists data of contract");
        return;
      }
      
      
      if(accounts.length !==0)
      {
          user.setAccountWallet(accounts[0]);
          
          //console.log(user.accountWallet);
          user.setIsConnectedWallet(true);
          if(setSwitchOn !== null)
            setSwitchOn(true);
          
          await connectContract(web3,user);
          try 
          {
            const isExistsUser = await getData("api/isExistsPatient_Doctor",true,{meta:user.accountWallet});
            console.log(isExistsUser);
            if(isExistsUser && isExistsUser.data.data && (isExistsUser.data.data.doctor || isExistsUser.data.data.patient))
            {
              user.setWhoIs(isExistsUser.data.data);
              try 
              {
                window.localStorage.setItem("registrationSuccess",true);  
                setIsRegistered(true);
              } catch (error) 
              {
                console.log("Error with work localStorage");
                console.error(error);
              }
            }else
            {
              if(window.localStorage.getItem("registrationSuccess"))
                window.localStorage.removeItem("registrationSuccess");
              if(window.localStorage.getItem("isAuth"))
                window.localStorage.removeItem("isAuth")
              setIsRegistered(false);
              
            } 
          } catch (error) 
          {
            console.log("Error with check exists user");
            console.error(error);  
            setIsRegistered(false);
          }
      }else
      {
          console.log('You have not wallet-account!');
      }
  
    } catch (error)
    {
        if(error.message)
        {
            console.log(error.message);
            if(error.message === "Returned error: User rejected the request.");
                setSwitchOn(false);
            if(error.message.includes("Please wait") === false && error.message.includes("User rejected the request.") === false)
                console.error(error);

        }else
            console.error(error);  
            
    }
    
}

const connectContract = async (web3,user) =>
{
    try
    {
      const dataOfContract = await abi.getDataOfContract();
      if(!dataOfContract)
      {
        console.error("Not connect with wallet or not exists data of contract");
        return;
      }

      if (dataOfContract && dataOfContract.status && dataOfContract.status >= 300)
      {
        if(dataOfContract.data && dataOfContract.data.message)
            console.error("Data don't get: " ,dataOfContract.data.message);
        else
          console.error("Data don't get: " ,dataOfContract.message);
        return;
      }
      const data = dataOfContract.data.data;
      const contract = new web3.eth.Contract(data.abi,data.address);
      window.contract = contract;
      user.setContract(contract);
      user.user.nameWallet = "ETH";
      
    }
    catch(error)
    {
      console.log("Error with connect to contract");
      console.error(error);
      throw error;
    }
}