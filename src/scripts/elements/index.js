import RestaurantItem from './restaurant-item';

class CustomElement{
    static init(){
        customElements.define('restaurant-item', RestaurantItem);
    }
}

export default CustomElement;
