/**
 * @jest-environment jsdom
 */

import RestaurantService from '../src/domains/RestaurantService';

describe('RestaurantService 테스트', () => {
  const restaurantService = new RestaurantService([]);

  beforeAll(() => {
    jest.spyOn(window.localStorage.__proto__, 'getItem');
    jest.spyOn(window.localStorage.__proto__, 'setItem');
    jest.spyOn(window.localStorage.__proto__, 'removeItem');

    restaurantService.add({ category: '한식', name: '얌샘김밥', distance: 15 });
    restaurantService.add({
      category: '중식',
      name: '딘타이펑',
      distance: 30,
      description: '샤오롱바오 맛집',
    });
    restaurantService.add({
      category: '중식',
      name: '명정루',
      distance: 10,
      description: '짜장면 맛집',
    });
    restaurantService.add({ category: '양식', name: '애슐리', distance: 10 });
    restaurantService.add({
      category: '한식',
      name: '평래옥',
      distance: 5,
      link: 'pyeongraeok.com',
    });
  });

  test('전체 카테고리, 이름순 정렬된 음식점 목록을 반환한다.', () => {
    expect(restaurantService.filterAndSort('전체', 'name')).toEqual([
      {
        category: '중식',
        name: '딘타이펑',
        distance: 30,
        description: '샤오롱바오 맛집',
      },
      {
        category: '중식',
        name: '명정루',
        distance: 10,
        description: '짜장면 맛집',
      },
      { category: '양식', name: '애슐리', distance: 10 },
      { category: '한식', name: '얌샘김밥', distance: 15 },
      {
        category: '한식',
        name: '평래옥',
        distance: 5,
        link: 'pyeongraeok.com',
      },
    ]);
  });

  test('전체 카테고리, 거리순 정렬된 음식점 목록을 반환한다.', () => {
    expect(restaurantService.filterAndSort('전체', 'distance')).toEqual([
      {
        category: '한식',
        name: '평래옥',
        distance: 5,
        link: 'pyeongraeok.com',
      },
      {
        category: '중식',
        name: '명정루',
        distance: 10,
        description: '짜장면 맛집',
      },
      { category: '양식', name: '애슐리', distance: 10 },
      { category: '한식', name: '얌샘김밥', distance: 15 },

      {
        category: '중식',
        name: '딘타이펑',
        distance: 30,
        description: '샤오롱바오 맛집',
      },
    ]);
  });

  test('중식 카테고리, 거리순 정렬된 음식점 목록을 반환한다.', () => {
    expect(restaurantService.filterAndSort('중식', 'distance')).toEqual([
      {
        category: '중식',
        name: '명정루',
        distance: 10,
        description: '짜장면 맛집',
      },
      {
        category: '중식',
        name: '딘타이펑',
        distance: 30,
        description: '샤오롱바오 맛집',
      },
    ]);
  });

  test('중식 카테고리, 이름순 정렬된 음식점 목록을 반환한다.', () => {
    expect(restaurantService.filterAndSort('중식', 'name')).toEqual([
      {
        category: '중식',
        name: '딘타이펑',
        distance: 30,
        description: '샤오롱바오 맛집',
      },
      {
        category: '중식',
        name: '명정루',
        distance: 10,
        description: '짜장면 맛집',
      },
    ]);
  });

  test('이름순 정렬 후 한식 카테고리인 음식점 목록을 반환한다.', () => {
    expect(restaurantService.filterAndSort('한식', 'name')).toEqual([
      { category: '한식', name: '얌샘김밥', distance: 15 },
      {
        category: '한식',
        name: '평래옥',
        distance: 5,
        link: 'pyeongraeok.com',
      },
    ]);
  });

  test('거리순 정렬 후 한식 카테고리인 음식점 목록을 반환한다.', () => {
    expect(restaurantService.filterAndSort('한식', 'distance')).toEqual([
      {
        category: '한식',
        name: '평래옥',
        distance: 5,
        link: 'pyeongraeok.com',
      },
      { category: '한식', name: '얌샘김밥', distance: 15 },
    ]);
  });
});
