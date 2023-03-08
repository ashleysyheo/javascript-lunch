import { Restaurant, RestaurantFilter } from './types/types';
import { INITIAL_RESTAURANT_DATA } from './constants/data';
import { $ } from './utils/domSelectors';
import { getLocalStorage, saveToLocalStorage } from './utils/localStorage';
import Header from './components/Header';
import RestaurantFilters from './components/RestaurantFilters';
import RestaurantListContainer from './components/RestaurantListContainer';
import Modal from './components/Modal';
import RestaurantAddForm from './components/RestaurantAddForm';
import RestaurantService from './domains/RestaurantService';
import RestaurantTabMenu from './components/RestaurantTabMenu';

class App {
  private restaurantService: RestaurantService;
  private formModal: Modal = new Modal(RestaurantAddForm);
  private currentDisplayStatus: RestaurantFilter = { category: '전체', sorting: '이름순' };
  private body = $('body') as HTMLBodyElement;

  constructor() {
    const restaurantList = getLocalStorage() ?? INITIAL_RESTAURANT_DATA;
    this.restaurantService = new RestaurantService(restaurantList);
    this.render();
    RestaurantListContainer.renderRestaurantItems(
      $('.restaurant-list') as HTMLUListElement,
      this.restaurantService.filterAndSort(this.currentDisplayStatus),
      this.updateFavoriteRestaurant
    );
    this.addEvents();
  }

  create() {
    return `
      ${Header.create()}
      <main>
        ${RestaurantTabMenu.create()}
        ${RestaurantFilters.create()}
        ${RestaurantListContainer.create()}
        ${this.formModal.create()}
      </main>
    `;
  }

  render() {
    this.body.insertAdjacentHTML('beforeend', this.create());
  }

  changeFilter = (filter: RestaurantFilter) => {
    this.currentDisplayStatus = { ...this.currentDisplayStatus, ...filter };
    const restaurantList = this.restaurantService.filterAndSort(this.currentDisplayStatus);
    RestaurantListContainer.renderRestaurantItems(
      $('.restaurant-list') as HTMLUListElement,
      restaurantList,
      this.updateFavoriteRestaurant
    );
  };

  addRestaurant = (restaurantItem: Restaurant) => {
    this.restaurantService.add(restaurantItem);
    const restaurantList = this.restaurantService.filterAndSort(this.currentDisplayStatus);
    saveToLocalStorage(restaurantList);

    if (
      restaurantItem.category === this.currentDisplayStatus.category ||
      this.currentDisplayStatus.category === '전체'
    ) {
      RestaurantListContainer.renderRestaurantItems(
        $('.restaurant-list') as HTMLUListElement,
        restaurantList,
        this.updateFavoriteRestaurant
      );
    }
  };

  updateFavoriteRestaurant = (restaurantItem: Restaurant) => {
    const updatedRestaurantList = this.restaurantService.updateFavorite(restaurantItem);
    saveToLocalStorage(updatedRestaurantList);
  };

  updateRestaurantList = (currentTab: string) => {
    const restaurantList =
      currentTab === 'all-restaurants'
        ? this.restaurantService.filterAndSort(this.currentDisplayStatus)
        : this.restaurantService.filterAndSort(
            this.currentDisplayStatus,
            this.restaurantService.getFavoriteRestaurantList()
          );

    RestaurantListContainer.renderRestaurantItems(
      $('.restaurant-list') as HTMLUListElement,
      restaurantList,
      this.updateFavoriteRestaurant
    );
  };

  addEvents() {
    Header.addEvent(this.formModal.openModal);
    RestaurantFilters.addEvent(this.changeFilter);
    this.formModal.addEvents(this.addRestaurant);
  }
}

export default new App();
