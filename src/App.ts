import { Restaurant, RestaurantFilter } from './types/index';
import { INITIAL_RESTAURANT_DATA } from './constants/data';
import { CATEGORY_ALL, DEFAULT_TAB, SORT_BY_NAME } from './constants/restaurant';
import { MODAL_ATTRIBUTE } from './constants/domAttributes';
import { getLocalStorage, saveToLocalStorage } from './utils/localStorage';
import RestaurantTabMenu from './components/RestaurantTabMenu';
import RestaurantFilters from './components/RestaurantFilters';
import RestaurantListContainer from './components/RestaurantListContainer';
import Modal from './components/Modal';
import RestaurantForm from './components/RestaurantForm';
import RestaurantInformation from './components/RestaurantInformation';
import { addHeaderEvent } from './events/headerEvents';
import RestaurantService from './domains/RestaurantService';

class App {
  private restaurantService: RestaurantService;
  private restaurantListContainer: RestaurantListContainer;
  private formModal: Modal = new Modal(MODAL_ATTRIBUTE.FORM, RestaurantForm);
  private informationModal: Modal = new Modal(MODAL_ATTRIBUTE.RESTAURANT_INFORMATION, RestaurantInformation);
  private currentDisplayStatus: RestaurantFilter = { category: CATEGORY_ALL, sorting: SORT_BY_NAME };
  private currentTab: string = DEFAULT_TAB;

  constructor() {
    const restaurantList = getLocalStorage() ?? INITIAL_RESTAURANT_DATA;
    this.restaurantService = new RestaurantService(restaurantList);
    this.restaurantListContainer = new RestaurantListContainer(this.restaurantService);

    this.renderComponents();
    this.restaurantListContainer.updateRestaurantList(this.currentTab, this.currentDisplayStatus);
    this.addEvents();
  }

  renderComponents() {
    RestaurantTabMenu.render(this.changeRestaurantMenuTab);
    RestaurantFilters.render(this.changeFilter);
    this.formModal.render(this.addRestaurant);
    this.informationModal.render(this.deleteRestaurant);
  }

  addRestaurant = (restaurantItem: Restaurant) => {
    this.restaurantService.add(restaurantItem);
    const restaurantList = this.restaurantService.getRestaurantList();
    saveToLocalStorage(restaurantList);

    if (
      (restaurantItem.category === this.currentDisplayStatus.category ||
        this.currentDisplayStatus.category === CATEGORY_ALL) &&
      this.currentTab === DEFAULT_TAB
    ) {
      this.restaurantListContainer.updateRestaurantList(this.currentTab, this.currentDisplayStatus);
    }
  };

  changeRestaurantMenuTab = (tab: string) => {
    this.currentTab = tab;
    this.restaurantListContainer.updateRestaurantList(this.currentTab, this.currentDisplayStatus);
  };

  changeFilter = (filter: RestaurantFilter) => {
    this.currentDisplayStatus = { ...this.currentDisplayStatus, ...filter };
    this.restaurantListContainer.updateRestaurantList(this.currentTab, this.currentDisplayStatus);
  };

  updateFavoriteRestaurant = (restaurantId: number) => {
    const updatedRestaurantList = this.restaurantService.updateFavorite(restaurantId);
    saveToLocalStorage(updatedRestaurantList);

    if (this.currentTab !== DEFAULT_TAB) {
      this.restaurantListContainer.updateRestaurantList(this.currentTab, this.currentDisplayStatus);
    }
  };

  showRestaurantInformation = (restaurantId: number) => {
    const restaurant = this.restaurantService.getRestaurant(restaurantId);
    RestaurantInformation.renderContent(restaurant, this.updateFavoriteRestaurant);
  };

  deleteRestaurant = (restaurantId: number) => {
    const updatedRestaurantList = this.restaurantService.delete(restaurantId);
    saveToLocalStorage(updatedRestaurantList);
    this.restaurantListContainer.updateRestaurantList(this.currentTab, this.currentDisplayStatus);
  };

  addEvents() {
    addHeaderEvent(this.formModal.open);
    this.restaurantListContainer.addEvent(
      this.updateFavoriteRestaurant,
      this.informationModal.open,
      this.showRestaurantInformation
    );
  }
}

export default new App();
