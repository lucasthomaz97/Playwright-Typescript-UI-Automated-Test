import { Page, Locator, expect } from '@playwright/test';
import { LOGIN_ERROR_MESSAGES } from '../helpers/data_factory';

export class LoginPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get headingTitle(): Locator {
        return this.page.getByText('Swag Labs');
    }

    get usernameInput(): Locator {
        return this.page.getByPlaceholder('Username');
    }

    get passwordInput(): Locator {
        return this.page.getByPlaceholder('Password');
    }

    get loginButton(): Locator {
        return this.page.getByRole('button', { name: 'Login' });
    }

    get closeButton(): Locator {
        return this.page.locator('[data-test="error-button"]');
    }

    get errorMessageLockedOut(): Locator {
        return this.page.getByText(LOGIN_ERROR_MESSAGES.lockedOut);
    }

    get errorMessageInvalidCredentials(): Locator {
        return this.page.getByText(LOGIN_ERROR_MESSAGES.invalidCredentials);
    }

    get errorMessageUsernameRequired(): Locator {
        return this.page.getByText(LOGIN_ERROR_MESSAGES.usernameRequired);
    }

    get errorMessagePasswordRequired(): Locator {
        return this.page.getByText(LOGIN_ERROR_MESSAGES.passwordRequired);
    }

    async goto(): Promise<void> {
        await this.page.goto('/');
    }

    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async expectLoginPage(): Promise<void> {
        await expect(this.headingTitle).toBeVisible();
        await expect(this.usernameInput).toBeVisible();
        await expect(this.passwordInput).toBeVisible();
        await expect(this.loginButton).toBeVisible();
    }
}