class Page {
    constructor(rootContent){
        this._rootContent = rootContent;
        console.log(this._rootContent);
        this.init();
    }

    async init(){
        this._rootContent.innerHTML = await this.render()
        await this.afterRender()
    }

     update(html){
        console.log('update html')
        console.log(this._rootContent)
        this._rootContent.innerHTML = html
    }
}

module.exports = Page