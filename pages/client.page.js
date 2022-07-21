import {t, Selector } from 'testcafe';
import XPathSelector from '../xpath-selector';

class Client {
    constructor () {
        this.menuButton = Selector('button.MenuButton');
        this.accountBalance = accountName => XPathSelector(
            `//div[contains(@data-rv-id, 'account:id') and .//h3[contains(@title, '${accountName}')]]//span[@class='AccountsGrid-printAvailableBalance']/span/span`);
        this.successMessage = Selector('span.message').withText('Transfer successful');
    }

    async clickMenu() {
        await t
            .expect(this.menuButton.visible).ok()
            .click(this.menuButton)
    }

    async balance(accountName) {
        const balanceText = await this.accountBalance(accountName).textContent
        const balanceNumber = Number(balanceText.replace(",", ""))

        return balanceNumber
    }
}

export default new Client();
