import {t, Selector } from 'testcafe';

class Client {
    constructor () {
        this.menuButton = Selector('button.MenuButton');
    }

    async clickMenu() {
        await t
            .expect(this.menuButton.visible).ok()
            .click(this.menuButton)
    }
}

export default new Client();
