import { IShowSidebarStatus } from '@tapps/types';
import { createContext, Dispatch, SetStateAction } from 'react';

interface AppContextProps {
  showSideBar?: IShowSidebarStatus;
  setShowSideBar?: Dispatch<SetStateAction<IShowSidebarStatus>>;
}

export const AppContext = createContext<AppContextProps>({});
