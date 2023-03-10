import { Restaurant } from '../types/index';
import { getFavoriteIcon } from '../constants/images';
import { $ } from '../utils/domSelectors';
import RestaurantItem from './RestaurantItem';

class RestaurantListContainer {
  changeRestaurantFavoriteIcon(element: HTMLImageElement) {
    if (element.classList.contains('favorite')) {
      element.classList.remove('favorite');
      element.src = getFavoriteIcon(false);
    } else {
      element.classList.add('favorite');
      element.src = getFavoriteIcon(true);
    }
  }

  removeRestaurantItem(target: Element, restaurantId: number) {
    const restaurantItem = $<HTMLUListElement>(`.restaurant[data-id="${restaurantId}"]`);
    target.removeChild(restaurantItem);
  }

  addEvent(
    onFavoriteIconClick: CallableFunction,
    getRestaurantInformation: CallableFunction,
    onItemClick: CallableFunction
  ) {
    const restaurantList = $<HTMLUListElement>('.restaurant-list');

    restaurantList.addEventListener('click', (event: Event) => {
      const target = event.target as HTMLElement;
      const itemElement = target.closest('.restaurant[data-id]') as HTMLElement;

      if (target.classList.contains('restaurant-star-icon') && target instanceof HTMLImageElement) {
        onFavoriteIconClick(Number(itemElement.dataset.id));
        this.changeRestaurantFavoriteIcon(target);
      } else {
        onItemClick();
        getRestaurantInformation(Number(itemElement.dataset.id));
      }
    });
  }

  create() {
    return `
      <section class="restaurant-list-container">
        <ul class="restaurant-list"></ul>
      </section>`;
  }

  renderRestaurantItems(parent: Element, restaurantList: Restaurant[]) {
    const restaurantItems = restaurantList.map((restaurant: Restaurant) =>
      new RestaurantItem(restaurant).create()
    );

    parent.replaceChildren();
    parent.insertAdjacentHTML('beforeend', restaurantItems.join(''));
  }
}

export default new RestaurantListContainer();
