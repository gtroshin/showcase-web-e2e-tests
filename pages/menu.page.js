import { t, Selector } from 'testcafe';

class Menu {
    constructor () {
        this.menu = Selector('nav.MainMenu-nav');
        this.payeesButton = Selector('a.Button').withAttribute('href', '/client/payees');
    }

    async openPayees() {
        await t
            .expect(this.menu.visible).ok()
            .expect(this.payeesButton.visible).ok()
            .click(this.payeesButton)
    }
}

export default new Menu();
