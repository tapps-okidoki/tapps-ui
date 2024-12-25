import { useQuery } from '@tanstack/react-query';
import { appService } from '@tapps/services/appService';

export const useGetAppList = () =>
  useQuery({
    queryKey: ['getAllAppList'],
    queryFn: async () => await appService.getAllApps(),
  });
