import { CategoryOptions, SortingCriterion, Restaurant } from '../types/types';

class RestaurantService {
  private restaurantList: Restaurant[];

  constructor(restaurantList: Restaurant[]) {
    this.restaurantList = restaurantList;
  }

  add(restaurant: Restaurant) {
    this.restaurantList.push(restaurant);
  }

  filter(category: CategoryOptions) {
    if (category === '전체') return [...this.restaurantList];

    return this.restaurantList.filter((restaurant) => restaurant.category === category);
  }

  sortByName(restaurantList: Restaurant[]) {
    return [...restaurantList].sort((a, b) => a.name.localeCompare(b.name));
  }

  sortByDistance(restaurantList: Restaurant[]) {
    return [...restaurantList].sort((a, b) => a.distance - b.distance);
  }

  filterAndSort(category: CategoryOptions, criterion: SortingCriterion) {
    const filteredRestaurantList = this.filter(category);

    if (criterion === 'name') {
      return this.sortByName(filteredRestaurantList);
    }

    return this.sortByDistance(filteredRestaurantList);
  }
}

export default RestaurantService;
