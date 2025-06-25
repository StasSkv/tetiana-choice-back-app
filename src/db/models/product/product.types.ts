export interface Description {
  name: string;
  desc: string;
}

export interface OptionAction {
  name: string;
  desc: string;
}

export interface Option {
  actions: OptionAction[];
  name?: string;
  desc?: string;
}

export interface Product {
  name: string;
  category: string;
  brief: string;
  volume: string;
  price: string;
  quantity: number;
  rating: number[];
  imgS: string;
  imgL: string;
  appointment: string;
  description: Description[];
  advantages: string[];
  actions: string[];
  options: Option[];
}
