const DrawerInitiator = {
    init({ button, drawer, content }) {
        this._isDrawerOpen = false;
        this._createBackdrop(drawer);

        this._backdrop.addEventListener('click', (event) => {
            this._toggleDrawer({event, drawer, button});
        })

        button.addEventListener('click', (event) => {
            this._toggleDrawer({event, drawer, button});
        });
    },

    _toggleDrawer({event, drawer, button}) {
        event.stopPropagation();
        event.preventDefault();
        drawer.classList.toggle('open');
        this._isDrawerOpen = !this._isDrawerOpen;
        if(this._isDrawerOpen){
            console.log('drawer open')
            button.innerHTML = "←";
            this._backdrop.style.zIndex = 6;
            this._backdrop.style.display = 'block';
        }else{
            console.log('drawer close')
            button.innerHTML = "☰";
            this._backdrop.style.zIndex = -6;
            this._backdrop.style.display = 'none';
        }
    },

    _createBackdrop() {
        drawer.insertAdjacentHTML('beforeBegin', '<div class="backdrop"></div>')
        this._backdrop = document.querySelector('.backdrop');
    }

};
   
export default DrawerInitiator;