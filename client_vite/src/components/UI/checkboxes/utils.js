// @ts-nocheck

import { getData } from '../../../http/getDataAPI';
import { checkRegistrationControls } from '../../../models/checkIsRegistered';
import { UserControls } from '../../../models/user';
import { removeLocalStorageItem, setLocalStorageItem, } from '../../../utils/helper';


export const connectMetamask = async (ethData, dispatch, setSwitchOn = null) =>
{
  if (setSwitchOn !== null)
    setSwitchOn(true);

  return await getData("api/isExistsPatient_Doctor", true, { meta: ethData.account })
    .then(result =>
    {
      if (!result || !(result.data.data.doctor || result.data.data.patient))
      {
        removeLocalStorageItem('registrationSuccess');
        removeLocalStorageItem('isAuth');
        dispatch(checkRegistrationControls.setRegistered(false));
        dispatch(UserControls.setLoading(false));
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
