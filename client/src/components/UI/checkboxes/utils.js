// @ts-nocheck

import * as abi from '../../../http/ABIandAddress';
import { getData } from '../../../http/getDataAPI';
import { removeLocalStorageItem , setLocalStorageItem,getWeb3,getAccountsEth,connectContractETH} from '../../../utils/helper';


export const connectMetamask = async (user,setIsRegistered,setSwitchOn=null,setName=null) =>
{
    const web3 = await getWeb3();
    const accounts = await getAccountsEth(web3,setSwitchOn);
    
    if(!accounts)
    {
      console.log("Not connect with wallet ");
      return;
    }

    if(accounts.length === 0)
    {
      console.log('You have not wallet-account!');
      return;
    }
    user.setAccountWallet(accounts[0]);
        
    //console.log(user.accountWallet);
    user.setIsConnectedWallet(true);
    if(setSwitchOn !== null)
      setSwitchOn(true);
    
    await connectContract(web3,user);
    getData("api/isExistsPatient_Doctor",true,{meta:accounts[0]})
    .then(result =>
    {
      if(!result || !(result.data.data.doctor || result.data.data.patient))
      {
        removeLocalStorageItem('registrationSuccess');
        removeLocalStorageItem('isAuth');
        setIsRegistered(false);
        return;
      }
      user.setWhoIs(result.data.data);
      setName(user.user.name);
      setLocalStorageItem('registrationSuccess',true); 
      setIsRegistered(true);
    })
    .catch(error =>
    {
      console.log("Error with check exists user");
      console.error(error);  
      setIsRegistered(false);
    });
    
}

const connectContract = async (web3,user) =>
{
  const dataOfContract = await abi.getDataOfContract();
  if(!dataOfContract)
  {
    console.error("Don't get data for contract (ABI and address ");
    return;
  }
  if (dataOfContract.status && dataOfContract.status >= 300)
  {
    if(dataOfContract.data && dataOfContract.data.message)
        console.error("Data don't get: " ,dataOfContract.data.message);
    else
      console.error("Data don't get: " ,dataOfContract.message);
    return;
  }
  const data = dataOfContract.data.data;
  const contract = await connectContractETH(web3,data.abi,data.address);
  window.contract = contract;
  user.setContract(contract);
  user.user.nameWallet = "ETH";

}