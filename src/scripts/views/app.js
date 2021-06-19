import routes from "../routes";
import UrlParser from "../routes/url-parser";
import DrawerInitiator from "../utils/drawer-initiator";
import ScrollHandler from "../utils/scroll-handler";
import Home from "./pages/home";

class App {
    constructor({ button, drawer, content }) {
      this._button = button;
      this._drawer = drawer;
      this._content = content;
      this._initialAppShell();
    }
   
    _initialAppShell() {
        DrawerInitiator.init({
            button: this._button,
            drawer: this._drawer,
            content: this._content,
        });
        
    }

    async renderPage() {
        ScrollHandler.remove()
        const url = UrlParser.parseActiveUrlWithCombiner();
        const page = new routes[url](this._content);        
    }
  }
   
  export default App;