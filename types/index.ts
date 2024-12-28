import { ECategoryName } from './enum';

export enum IShowSidebarStatus {
  show = 'show',
  hide = 'hide',
}

export interface IPromotedAppItem {
  id: string;
  image: string;
}

export interface IMostPopularItem {
  id: string;
  image: string;
  title: string;
  description: string;
}

export interface ICardLink {
  apple: string;
  android: string;
  telegram: string;
  web: string;
}

export interface ICardItem {
  id: string;
  image: string;
  title: string;
  description: string;
  links: ICardLink;
  count: number;
}

export interface IGameItem {
  id: string;
  image: string;
  title: string;
  description: string;
  links: ICardLink;
}

export interface IGetAllAppsResResultAppItem {
  _id: string;
  system: 'tapps';
  create_at: Date;
  create_by: 'tapps';
  change_at: Date;
  change_by: 'tapps';
  del_flag: boolean;
  app_position: string;
  app_name: string;
  app_type: string;
  app_link: string;
  app_short_des: string;
  app_long_des: string;
  is_telegram_mini_app: string;
  app_languages: string;
  offcial_links: string;
  app_platform: string;
  __v: 0;
  category_id: string;
}

export interface IGetAllAppsResResult {
  apps: IGetAllAppsResResultAppItem[];
  cateory: {
    _id: string;
    system: 'tapps';
    create_at: Date;
    create_by: 'tapps';
    change_at: Date;
    change_by: 'tapps';
    del_flag: boolean;
    name: ECategoryName;
    description: string;
    image: string;
    __v: 0;
  };
}

export interface IGetAllAppsRes {
  num: number;
  result: IGetAllAppsResResult[];
  status: string;
}
