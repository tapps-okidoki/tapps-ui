import {
  IGetAllAppsRes,
  IGetAllCategoriesRes,
  IGetAllCategoriesResBody,
  IGetAppsByCategory,
} from '@tapps/types';
import { https } from './configURL';
import { AxiosResponse } from 'axios';

export const appService = {
  getAllApps: async () => {
    const response: AxiosResponse<IGetAllAppsRes> =
      await https.post(`core/app-list`);
    return response.data.result;
  },
  getAppsByCategory: async (requestBody: IGetAppsByCategory) => {
    const response: AxiosResponse<IGetAllAppsRes> = await https.post(
      `core/app-list`,
      requestBody,
    );
    return response.data.result[0];
  },
  getAllCategories: async (requestBody?: IGetAllCategoriesResBody) => {
    const response: AxiosResponse<IGetAllCategoriesRes> = await https.post(
      `core/category-list`,
      requestBody,
    );
    return response.data.result;
  },
};
