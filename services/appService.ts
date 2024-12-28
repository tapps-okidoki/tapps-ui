import { IGetAllAppsRes } from '@tapps/types';
import { https } from './configURL';
import { AxiosResponse } from 'axios';

export const appService = {
  getAllApps: async () => {
    const response: AxiosResponse<IGetAllAppsRes> =
      await https.post(`core/app-list`);
    return response.data.result;
  },
};
