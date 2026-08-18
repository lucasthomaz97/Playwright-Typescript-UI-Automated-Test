import { test, expect } from '../fixtures/index';
import { CREDENTIALS } from '../helpers/data_factory';

const emptyFieldLoginCases = [
    { username: '', password: '', errorType: 'usernameRequired' as const, description: 'both fields empty' },
    { username: CREDENTIALS.standard.username, password: '', errorType: 'passwordRequired' as const, description: 'password empty' },
    { username: '', password: CREDENTIALS.standard.password, errorType: 'usernameRequired' as const, description: 'username empty' },
];

test.describe('@login', () => {
    emptyFieldLoginCases.forEach(({ username, password, errorType, description }) => {
        test(`Should display error when ${description}`, async ({ loginPage }) => {
            if (username) await loginPage.usernameInput.fill(username);
            if (password) await loginPage.passwordInput.fill(password);
            await loginPage.loginButton.click();
            const expectedError = errorType === 'passwordRequired'
                ? loginPage.errorMessagePasswordRequired
                : loginPage.errorMessageUsernameRequired;
            const expectedText = errorType === 'passwordRequired'
                ? 'Epic sadface: Password is required'
                : 'Epic sadface: Username is required';
            await expect(expectedError).toHaveText(expectedText);
        });
    });

    test('Should display login page', async ({ loginPage }) => {
        await loginPage.expectLoginPage();
    });

    test('Should display locked out error for locked user', async ({ loginPage }) => {
        await loginPage.login(CREDENTIALS.lockedOut.username, CREDENTIALS.lockedOut.password);
        await expect(loginPage.errorMessageLockedOut).toBeVisible();
    });

    test('Should display error for invalid password', async ({ loginPage }) => {
        await loginPage.login(CREDENTIALS.invalidPassword.username, CREDENTIALS.invalidPassword.password);
        await expect(loginPage.errorMessageInvalidCredentials).toBeVisible();
    });

    test('Should display error for invalid username', async ({ loginPage }) => {
        await loginPage.login(CREDENTIALS.invalidUsername.username, CREDENTIALS.invalidUsername.password);
        await expect(loginPage.errorMessageInvalidCredentials).toBeVisible();
    });

    test('Should login successfully with valid credentials', async ({ page, loginPage, productsPage }) => {
        await loginPage.login(CREDENTIALS.standard.username, CREDENTIALS.standard.password);
        await expect(page).toHaveURL(/.*inventory/);
        await productsPage.expectProductsPage();
    });

    test('Should close error message when clicking close button', async ({ loginPage }) => {
        await loginPage.login(CREDENTIALS.invalidBoth.username, CREDENTIALS.invalidBoth.password);
        await expect(loginPage.errorMessageInvalidCredentials).toBeVisible();
        await loginPage.closeButton.click();
        await expect(loginPage.errorMessageInvalidCredentials).not.toBeVisible();
    });
});