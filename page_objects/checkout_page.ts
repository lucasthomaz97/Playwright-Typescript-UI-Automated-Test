import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get checkoutHeading(): Locator {
        return this.page.locator('[data-test="title"]');
    }

    get quantityLabel(): Locator {
        return this.page.locator('[data-test="cart-quantity-label"]');
    }

    get descriptionLabel(): Locator {
        return this.page.locator('[data-test="cart-desc-label"]');
    }

    get continueShoppingButton(): Locator {
        return this.page.locator('[data-test="continue-shopping"]');
    }

    get checkoutButton(): Locator {
        return this.page.locator('[data-test="checkout"]');
    }

    get yourInformationFirstNameInput(): Locator {
        return this.page.locator('[data-test="firstName"]');
    }

    get yourInformationLastNameInput(): Locator {
        return this.page.locator('[data-test="lastName"]');
    }

    get yourInformationPostalCodeInput(): Locator {
        return this.page.locator('[data-test="postalCode"]');
    }

    get yourInformationCancelButton(): Locator {
        return this.page.locator('[data-test="cancel"]');
    }

    get yourInformationContinueButton(): Locator {
        return this.page.locator('[data-test="continue"]');
    }

    get yourInformationErrorMessage(): Locator {
        return this.page.locator('[data-test="error"]');
    }

    get overviewPaymentInformationLabel(): Locator {
        return this.page.locator('[data-test="payment-info-label"]');
    }

    get overviewPaymentValueLabel(): Locator {
        return this.page.locator('[data-test="payment-info-value"]');
    }

    get overviewShippingInformationLabel(): Locator {
        return this.page.locator('[data-test="shipping-info-label"]');
    }

    get overviewShippingValueLabel(): Locator {
        return this.page.locator('[data-test="shipping-info-value"]');
    }

    get overviewTotalLabel(): Locator {
        return this.page.locator('[data-test="total-info-label"]');
    }

    get overviewSubtotalLabel(): Locator {
        return this.page.locator('[data-test="subtotal-label"]');
    }

    get overviewTaxLabel(): Locator {
        return this.page.locator('[data-test="tax-label"]');
    }

    get overviewTotalValueLabel(): Locator {
        return this.page.locator('[data-test="total-label"]');
    }

    get overviewCancelButton(): Locator {
        return this.page.locator('[data-test="cancel"]');
    }

    get overviewFinishButton(): Locator {
        return this.page.locator('[data-test="finish"]');
    }

    get checkoutCompleteImage(): Locator {
        return this.page.locator('[data-test="pony-express"]');
    }

    get checkoutCompleteHeader(): Locator {
        return this.page.locator('[data-test="complete-header"]');
    }

    get checkoutCompleteText(): Locator {
        return this.page.locator('[data-test="complete-text"]');
    }

    get checkoutCompleteBackHomeButton(): Locator {
        return this.page.locator('[data-test="back-to-products"]');
    }

    getProductItem(i: number): Locator {
        return this.page.locator('[data-test="inventory-item"]').nth(i);
    }

    getQuantity(i: number): Locator {
        return this.getProductItem(i).locator('[data-test="item-quantity"]');
    }

    getProductName(i: number): Locator {
        return this.getProductItem(i).locator(`[data-test="inventory-item-name"]`);
    }

    getProductPrice(i: number): Locator {
        return this.getProductItem(i).locator('[data-test="inventory-item-price"]');
    }

    getProductDescription(i: number): Locator {
        return this.getProductItem(i).locator('[data-test="inventory-item-desc"]');
    }

    getProductRemoveButton(i: number): Locator {
        return this.getProductItem(i).getByText('Remove');
    }

    async expectProductInfo(i: number, quantity: number = 1) {
        await expect(this.getQuantity(i)).toHaveText(quantity.toString());
        await expect(this.getProductName(i)).toBeVisible();
        await expect(this.getProductDescription(i)).toBeVisible();
        await expect(this.getProductPrice(i)).toBeVisible();
    }

    async expectCheckoutPage() {
        await expect(this.checkoutHeading).toHaveText('Your Cart');
        await expect(this.quantityLabel).toBeVisible();
        await expect(this.descriptionLabel).toBeVisible();
        await expect(this.continueShoppingButton).toBeVisible();
        await expect(this.checkoutButton).toBeVisible();
    }

    async expectYourInformationPage() {
        await expect(this.checkoutHeading).toHaveText('Checkout: Your Information');
        await expect(this.yourInformationFirstNameInput).toBeVisible();
        await expect(this.yourInformationLastNameInput).toBeVisible();
        await expect(this.yourInformationPostalCodeInput).toBeVisible();
        await expect(this.yourInformationCancelButton).toBeVisible();
        await expect(this.yourInformationContinueButton).toBeVisible();
    }

    async expectOverviewPage(productsCount: number = 1) {
        await expect(this.checkoutHeading).toHaveText('Checkout: Overview');
        for (let i = 0; i < productsCount; i++) {
            await this.expectProductInfo(i);
        }
        await expect(this.overviewPaymentInformationLabel).toHaveText('Payment Information:');
        await expect(this.overviewPaymentValueLabel).toHaveText('SauceCard #31337');
        await expect(this.overviewShippingInformationLabel).toHaveText('Shipping Information:');
        await expect(this.overviewShippingValueLabel).toHaveText('Free Pony Express Delivery!');
        await expect(this.overviewTotalLabel).toHaveText('Price Total');
        await expect(this.overviewSubtotalLabel).toContainText('Item total:');
        await expect(this.overviewTaxLabel).toContainText('Tax:');
        await expect(this.overviewTotalValueLabel).toContainText('Total:');
        await expect(this.overviewCancelButton).toBeVisible();
        await expect(this.overviewFinishButton).toBeVisible();
    }

    async expectCheckoutCompletePage() {
        await expect(this.checkoutHeading).toHaveText('Checkout: Complete!');
        await expect(this.checkoutCompleteImage).toBeVisible();
        await expect(this.checkoutCompleteHeader).toHaveText('Thank you for your order!');
        await expect(this.checkoutCompleteText).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
        await expect(this.checkoutCompleteBackHomeButton).toBeVisible();
    }

    async fillYourInformationForm(firstName: string, lastName: string, postalCode: string) {
        await this.yourInformationFirstNameInput.fill(firstName);
        await this.yourInformationLastNameInput.fill(lastName);
        await this.yourInformationPostalCodeInput.fill(postalCode);
    }
}