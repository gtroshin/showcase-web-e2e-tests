import { baseUrl, randomString } from '../utilities';
import defaults from '../defaults';
import client from '../pages/client.page';
import menu from '../pages/menu.page';
import payees from '../pages/payees.page';

fixture `As a user I should be able to`
    .page `${baseUrl()}`
    .beforeEach( async t => {
        t.ctx.newPayeeName = randomString();
        // common steps
        await client.clickMenu()
        await menu.openPayees()
    });

    test('navigate to Payees page using the navigation menu', async t => { // TC1
        await payees.loaded()
    });
    
    test('add new payee in the Payees page', async t => { // TC2
        await payees.addPayee(
            t.ctx.newPayeeName, 
            defaults.bank[1], 
            defaults.branch[1], 
            defaults.account[1], 
            defaults.suffix[1])

        await payees.added(t.ctx.newPayeeName)
    });

    test('see that payee name is a required field', async t => { // TC3
        await t
            .expect(payees.addButton.visible).ok()
            .click(payees.addButton)
            .expect(payees.saveButton.visible).ok()
            .click(payees.saveButton)
            .expect(payees.nameTooltipMessage.visible).ok()
            .expect(payees.errorMessage.visible).ok()
            .expect(payees.nameInput.visible).ok()
            .typeText(payees.nameInput, t.ctx.newPayeeName)
            .click(payees.nameLabel)
            // error message and tooltip should not be visible
            .expect(payees.nameTooltipMessage.visible).notOk({ timeout: 5000 })
            .expect(payees.errorMessage.visible).notOk({ timeout: 5000 })
    });

    test('sort payees by name', async t => { // TC4
        await payees.addPayee(
            t.ctx.newPayeeName, 
            defaults.bank[2], 
            defaults.branch[2], 
            defaults.account[2], 
            defaults.suffix[2])

        await payees.added(t.ctx.newPayeeName)

        await payees.verifySortingOrder()
        // reverse order from default Ascending to Descending
        await t.click(payees.buttonSortAscendingOrder)

        await payees.verifySortingOrder(false)
    });
