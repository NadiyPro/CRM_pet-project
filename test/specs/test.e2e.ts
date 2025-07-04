import { browser } from '@wdio/globals';

describe('Login Flow', () => {
    it('should login successfully and navigate to /orders', async () => {
        await browser.url('/');

        const emailInput = await $('input[type="email"]');
        const passwordInput = await $('input[type="password"]');
        const loginButton = await $('button[type="submit"]');

        await emailInput.setValue('admin@gmail.com');
        await passwordInput.setValue('admin');
        await loginButton.click();

        await browser.pause(2000);

        const url = await browser.getUrl();
        expect(url).toContain('/orders');
    });
});