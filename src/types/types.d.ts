export type AllCategory = '전체';
export type Category = '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';
export type Distance = 5 | 10 | 15 | 20 | 30;
export type SortingCriterion = 'name' | 'distance';

export type CategoryOptions = AllCategory | Category;

export type Restaurant = {
  category: Category;
  name: string;
  distance: Distance;
  description?: string;
  link?: string;
};

export type RestaurantFilter = {
  category?: CategoryFilterOption;
  sorting?: SortingOption;
};

export type Errors = {
  [key: string]: Boolean;
};

export type Option = {
  text: string[];
  value: string[];
};

export type Attribute = {
  name: string;
  id: string;
  className?: string;
  type?: string;
  required?: boolean;
};
