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
  system: string;
  create_at: Date;
  create_by: string;
  change_at: Date;
  change_by: string;
  del_flag: boolean;
  app_position: string;
  app_name: string;
  app_type: string;
  app_link: string;
  app_short_des: string;
  app_long_des: string;
  app_image: string;
  is_telegram_mini_app: string;
  app_languages: string;
  offcial_links: string;
  app_platform: string;
  __v: 0;
  category_id: string;
}

export interface IGetAllAppsResResultCategory {
  _id: string;
  system: string;
  create_at: Date;
  create_by: string;
  change_at: Date;
  change_by: string;
  del_flag: boolean;
  name: string;
  description: string;
  image: string;
  spec_name: ECategoryName;
  __v: 0;
}

export interface IGetAllAppsResResult {
  apps: IGetAllAppsResResultAppItem[];
  cateory: IGetAllAppsResResultCategory;
}

export interface IGetAllAppsRes {
  num: number;
  result: IGetAllAppsResResult[];
  status: string;
}

export interface IGetAllCategoriesRes {
  num: number;
  result: Partial<IGetAllAppsResResultCategory>[];
  status: string;
}

export interface ITelegramUserInfo {
  id: number;
  is_bot?: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
  is_premium?: boolean;
  photo_url?: string;
  isNewUser?: boolean;
}

export interface IGetAllCategoriesResBody {
  select: '_id';
}

export interface IGetAppsByCategory {
  category: ECategoryName;
}
