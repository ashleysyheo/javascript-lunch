const REGEX = {
  VALID_URL:
    /^((ftp|http|https):\/\/)?([a-zA-Z0-9]+\.)*[a-zA-Z0-9][a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,6})(:[0-9]+)?(\/.*)?$/,
  VALID_NAME: /^[a-zA-Z가-힣ㄱ-ㅎㅏ-ㅣㅑ-ㅣㅠ-ㅣ0-9!@#$%^&*?'\",. ]+$/,
};

const ERROR_MESSAGE = {
  EMPTY_CATEGORY: '카테고리를 선택해 주세요.',
  EMPTY_DISTANCE: '거리를 선택해 주세요.',
  INVALID_NAME: `음식점 이름은 한글, 영어, 숫자, !@#$%^&*?'",.만 포함하여 입력해 주세요.`,
  INVALID_LINK: '유효한 링크를 입력해 주세요.',
};

const MESSAGE = {
  LINK_DEFAULT_CAPTION: '매장 정보를 확인할 수 있는 링크를 입력해 주세요.',
};

const LOCAL_STORAGE_KEY = 'restaurants';

const DEFAULT_TAB = 'all-restaurants';

const TAB_ALL_NAME = '모든 음식점';
const TAB_FAVORITE_NAME = '자주 가는 음식점';

const CATEGORY_ALL = '전체';
const SORT_BY_NAME = '이름순';

const RESTAURANT_DISTANCE = [5, 10, 15, 20, 30] as const;

const OPTION_NAMES = {
  PLACEHOLDER: '선택해 주세요',
  CATEGORY: ['한식', '중식', '일식', '양식', '아시안', '기타'],
  SORTING: [SORT_BY_NAME, '거리순'],
  DISTANCE: ['5분 내', '10분 내', '15분 내', '20분 내', '30분 내'],
} as const;

const OPTION_VALUES = {
  PLACEHOLDER: '',
  DISTANCE: ['5', '10', '15', '20', '30'],
} as const;

const SELECT_OPTIONS = {
  CATEGORY_FILTER: {
    text: [CATEGORY_ALL, ...OPTION_NAMES.CATEGORY],
    value: [CATEGORY_ALL, ...OPTION_NAMES.CATEGORY],
  },
  SORTING_FILTER: {
    text: OPTION_NAMES.SORTING,
    value: OPTION_NAMES.SORTING,
  },
  CATEGORY: {
    text: [OPTION_NAMES.PLACEHOLDER, ...OPTION_NAMES.CATEGORY],
    value: [OPTION_VALUES.PLACEHOLDER, ...OPTION_NAMES.CATEGORY],
  },
  DISTANCE: {
    text: [OPTION_NAMES.PLACEHOLDER, ...OPTION_NAMES.DISTANCE],
    value: [OPTION_VALUES.PLACEHOLDER, ...OPTION_VALUES.DISTANCE],
  },
};

export {
  REGEX,
  ERROR_MESSAGE,
  MESSAGE,
  LOCAL_STORAGE_KEY,
  DEFAULT_TAB,
  TAB_ALL_NAME,
  TAB_FAVORITE_NAME,
  CATEGORY_ALL,
  SORT_BY_NAME,
  RESTAURANT_DISTANCE,
  OPTION_NAMES,
  OPTION_VALUES,
  SELECT_OPTIONS,
};
