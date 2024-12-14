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
