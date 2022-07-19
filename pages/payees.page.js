import {t, Selector, ClientFunction } from 'testcafe';
import { getLocation } from '../utilities';

class Payees {
    constructor () {
        this.location = ClientFunction(() => document.location.href);
        this.page = Selector('span').withExactText('Payees');
        this.addButton = Selector('button.js-add-payee');
        this.nameInput = Selector('input#ComboboxInput-apm-name');
        this.nameLabel = Selector('label[for="apm-name"]');
        this.bankInput = Selector('input#apm-bank');
        this.branchInput = Selector('input#apm-branch');
        this.accountInput = Selector('input#apm-account');
        this.suffixInput = Selector('input#apm-suffix');
        this.saveButton = Selector('button.Button--primary');
        this.successMessage = Selector('span.message').withText('Payee added');
        this.name = x => Selector('span.js-payee-name').withText(x);
        this.nameTooltipMessage = Selector('p.js-tooltip-text').withText(
            'Payee Name is a required field. Please complete to continue.');
        this.errorMessage = Selector('div.error-header');
    }

    async loaded() {
        await t
            .expect(getLocation()).contains('/client/payees')
            .expect(this.page.visible).ok()
    }

    async addPayee(name, bank, branch, account, suffix) {
        await t
            .expect(this.addButton.visible).ok()
            .click(this.addButton)
            .expect(this.nameInput.visible).ok()
            .typeText(this.nameInput, name)
            .click(this.nameLabel)
            .expect(this.bankInput.visible).ok()
            .typeText(this.bankInput, bank)
            .expect(this.branchInput.visible).ok()
            .typeText(this.branchInput, branch)
            .expect(this.accountInput.visible).ok()
            .typeText(this.accountInput, account)
            .expect(this.suffixInput.visible).ok()
            .typeText(this.suffixInput, suffix)
            .expect(this.saveButton.visible).ok()
            .click(this.saveButton)
    }

    async added(payeeName) {
        await t 
            .expect(this.successMessage.visible).ok({ timeout: 5000 })
            .expect(this.name(payeeName).visible).ok()
    }
}

export default new Payees();
