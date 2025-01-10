import { useQuery } from '@tanstack/react-query';
import { appService } from '@tapps/services/appService';
import { IGetAppsByCategory } from '@tapps/types';

export const useGetAppByCategory = (requestBody: IGetAppsByCategory) =>
  useQuery({
    queryKey: ['useGetAppByCategory', requestBody],
    queryFn: async () => await appService.getAppsByCategory(requestBody),
  });
