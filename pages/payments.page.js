import {t, Selector, ClientFunction } from 'testcafe';
import XPathSelector from '../xpath-selector';
import { getLocation } from '../utilities';

class Payments {
    constructor () {
        this.location = ClientFunction(() => document.location.href);
        this.page = Selector('div[data-testid="PaymentModal"]');
        this.chooseAccountFromButton = Selector('button[data-testid="from-account-chooser"]');
        this.chooseAccountToButton = Selector('button[data-testid="to-account-chooser"]');
        this.searchInput = Selector('input[data-monitoring-label*="Search"]');
        this.searchResult = (accountName) => XPathSelector(
            `//button[contains(@data-monitoring-label, 'Transfer Form Account Card') and .//p[contains(@class, 'name') and contains(., '${accountName}')]]`);
        this.amountInput = Selector('input[data-monitoring-label="Transfer Form Amount"]');
        this.transferButton = Selector('button[data-monitoring-label="Transfer Form Submit"]');
    }

    async loaded() {
        await t
            .expect(getLocation()).contains('/client/payments')
            .expect(this.page.visible).ok()
    }

    async chooseAccountFrom(accountName) {
        await t
            .expect(this.chooseAccountFromButton.visible).ok()
            .click(this.chooseAccountFromButton)
            .typeText(this.searchInput, accountName)
            .expect(this.searchResult(accountName).visible).ok()
            .click(this.searchResult(accountName))
    }

    async chooseAccountTo(accountName) {
        await t
            .expect(this.chooseAccountToButton.visible).ok()
            .click(this.chooseAccountToButton)
            .typeText(this.searchInput, accountName)
            .expect(this.searchResult(accountName).visible).ok()
            .click(this.searchResult(accountName))
    }

    async transferAmount(amount) {
        await t
            .expect(this.amountInput.visible).ok()
            .click(this.amountInput)
            .typeText(this.amountInput, String(amount))
            .expect(this.transferButton.visible).ok()
            .click(this.transferButton)
    }
}

export default new Payments();
