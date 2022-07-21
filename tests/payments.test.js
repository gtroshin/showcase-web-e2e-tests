import { baseUrl, randomString } from '../utilities';
import client from '../pages/client.page';
import payments from '../pages/payments.page';

fixture `As a user I should be able to`
    .page `${baseUrl()}payments/`
    .beforeEach( async t => {
        t.ctx.newPayeeName = randomString();
        // common steps
        await payments.loaded()
    });

    test('make a transfer on Payments page', async t => { // TC5
        const accountFrom = 'Everyday'
        const accountTo = 'Bills'
        const transferAmount = 500
        const balance_1 = await client.balance('Everyday')
        const balance_2 = await client.balance('Bills')

        await payments.chooseAccountFrom(accountFrom)
        await payments.chooseAccountTo(accountTo)

        await payments.transferAmount(transferAmount)

        const new_balance_1 = await client.balance('Everyday')
        const new_balance_2 = await client.balance('Bills')

        await t
            .expect(client.successMessage.visible).ok()
            .expect((balance_1 - transferAmount) == new_balance_1).ok(
                `Expected new balance for ${accountFrom} (${balance_1} - ${transferAmount}) != ${new_balance_1}`)
            .expect((balance_2 + transferAmount) == new_balance_2).ok(
                `Expected new balance for ${accountTo} (${balance_2} + ${transferAmount}) != ${new_balance_2}`)
    });
