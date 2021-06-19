import Home from "../views/pages/home";
import RestaurantDetail from "../views/pages/restaurant-detail";

const routes = {
  '/': Home, // default page
  '/restaurant/:id': RestaurantDetail, // default page
//   '/now-playing': NowPlaying,
//   '/upcoming': Upcoming,
//   '/detail/:id': Detail,
};
 
export default routes;