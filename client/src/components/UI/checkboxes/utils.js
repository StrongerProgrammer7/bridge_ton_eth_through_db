// @ts-nocheck

import * as abi from '../../../http/ABIandAddress';
import { getData } from '../../../http/getDataAPI';
import { checkRegistrationControls } from '../../../models/checkIsRegistered';
import { UserControls } from '../../../models/user';
import { removeLocalStorageItem, setLocalStorageItem, getWeb3, getAccountsEth, connectContractETH } from '../../../utils/helper';


export const connectMetamask = async (dispatch, setSwitchOn = null) =>
{
  const web3 = await getWeb3();
  const accounts = await getAccountsEth(web3, setSwitchOn);

  if (!accounts)
  {
    console.log("Not connect with wallet ");
    return;
  }

  if (accounts.length === 0)
  {
    console.log('You have not wallet-account!');
    return;
  }

  dispatch(UserControls.setAccountWallet(accounts[0]));

  if (setSwitchOn !== null)
    setSwitchOn(true);

  await connectContract(web3, dispatch);
  getData("api/isExistsPatient_Doctor", true, { meta: accounts[0] })
    .then(result =>
    {
      if (!result || !(result.data.data.doctor || result.data.data.patient))
      {
        removeLocalStorageItem('registrationSuccess');
        removeLocalStorageItem('isAuth');
        dispatch(checkRegistrationControls.setRegistered(false));
        dispatch(UserControls.setLoading(false));
        return;
      }

      dispatch(UserControls.setWhoIs(result.data.data));
      setLocalStorageItem('registrationSuccess', true);
      dispatch(checkRegistrationControls.setRegistered(true));
      dispatch(UserControls.setLoading(false));
    })
    .catch(error =>
    {
      console.log("Error with check exists user");
      console.error(error);
      dispatch(checkRegistrationControls.setRegistered(false));
    });

}

const connectContract = async (web3, dispatch) =>
{
  const dataOfContract = await abi.getDataOfContract();
  if (!dataOfContract)
  {
    console.error("Don't get data for contract (ABI and address ");
    return;
  }
  if (dataOfContract.status && dataOfContract.status >= 300)
  {
    if (dataOfContract.data && dataOfContract.data.message)
      console.error("Data don't get: ", dataOfContract.data.message);
    else
      console.error("Data don't get: ", dataOfContract.message);
    return;
  }
  const data = dataOfContract.data.data;
  const contract = await connectContractETH(web3, data.abi, data.address);
  window.contract = contract;
  dispatch(UserControls.setContract(contract));
  dispatch(UserControls.setNameWallet('ETH'));

}