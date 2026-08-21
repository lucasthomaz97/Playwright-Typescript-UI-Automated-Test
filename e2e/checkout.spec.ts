import { test, expect } from '../fixtures/index';
import { CREDENTIALS } from '../helpers/data_factory';

test.describe('@checkout_consistency', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.login(CREDENTIALS.standard.username, CREDENTIALS.standard.password);
    });

    test('Should return to products page when clicking continue shopping button on checkout page', async ({ productsPage, checkoutPage }) => {
        await productsPage.shoppingCartLink.click();
        await checkoutPage.continueShoppingButton.click();
        await productsPage.expectProductsPage();
    });

    test('Should keep products in cart after navigating back to products page from checkout page', async ({ productsPage, checkoutPage }) => {
        await productsPage.getProductAddToCartButton(0).click();
        await productsPage.shoppingCartLink.click();
        await checkoutPage.expectProductInfo(0);
        await checkoutPage.continueShoppingButton.click();
        await expect(productsPage.productsHeading).toBeVisible();
        await expect(productsPage.shoppingCartBadge).toHaveText('1');
        await productsPage.shoppingCartLink.click();
        await checkoutPage.expectProductInfo(0);
    });

    const checkoutTestCases = [0, 2, 5]; // 1, 3, and 6 products
    for (const i of checkoutTestCases) {
        test(`Should display all the ${i + 1} products in checkout page after adding them to cart`, async ({ productsPage, checkoutPage }) => {
            for (let j = 0; j <= i; j++) {
                await productsPage.getProductAddToCartButton(j).click();
                await expect(productsPage.shoppingCartBadge).toBeVisible();
                await expect(productsPage.shoppingCartBadge).toHaveText(`${j + 1}`);
            }
            await productsPage.shoppingCartLink.click();

            for (let j = 0; j <= i; j++) {
                await checkoutPage.expectProductInfo(j);
            }
        });

        test(`Should display all the ${i + 1} products in overview page after adding them to cart and filling Your Information form`, async ({ productsPage, checkoutPage, checkoutData }) => {
            for (let j = 0; j <= i; j++) {
                await productsPage.getProductAddToCartButton(j).click();
                await expect(productsPage.shoppingCartBadge).toBeVisible();
                await expect(productsPage.shoppingCartBadge).toHaveText(`${j + 1}`);
            }
            await productsPage.shoppingCartLink.click();
            await checkoutPage.checkoutButton.click();
            await checkoutPage.expectYourInformationPage();
            await checkoutPage.yourInformationFirstNameInput.fill(checkoutData.firstName);
            await checkoutPage.yourInformationLastNameInput.fill(checkoutData.lastName);
            await checkoutPage.yourInformationPostalCodeInput.fill(checkoutData.postalCode);
            await checkoutPage.yourInformationContinueButton.click();
            await checkoutPage.expectOverviewPage(i + 1);
        });
    };
});

test.describe('@checkout_functionality_cart', () => {
    test.beforeEach(async ({ loginPage, productsPage, checkoutPage }) => {
        await loginPage.login(CREDENTIALS.standard.username, CREDENTIALS.standard.password);
        await productsPage.getProductAddToCartButton(0).click();
        await productsPage.shoppingCartLink.click();
        await checkoutPage.expectCheckoutPage();
    });

    test('Should display checkout page after navigating to checkout page', async ({ checkoutPage }) => {
        await expect(checkoutPage.checkoutHeading).toHaveText('Your Cart');
        await expect(checkoutPage.quantityLabel).toHaveText('QTY');
        await expect(checkoutPage.descriptionLabel).toHaveText('Description');
        await expect(checkoutPage.continueShoppingButton).toBeVisible();
        await expect(checkoutPage.checkoutButton).toBeVisible();
    });

    test('Should remove product from checkout page when clicking on remove', async ({ checkoutPage }) => {
        await checkoutPage.getProductRemoveButton(0).click();
        await expect(checkoutPage.getProductItem(0)).toBeHidden();
        await expect(checkoutPage.shoppingCartBadge).not.toBeVisible();
    });
});

test.describe('@checkout_functionality_your_information', () => {
    test.beforeEach(async ({ loginPage, productsPage, checkoutPage }) => {
        await loginPage.login(CREDENTIALS.standard.username, CREDENTIALS.standard.password);
        await productsPage.getProductAddToCartButton(0).click();
        await productsPage.shoppingCartLink.click();
        await checkoutPage.checkoutButton.click();
        await checkoutPage.expectYourInformationPage();
    });

    test('Should display Your Information page with empty inputs', async ({ checkoutPage }) => {
        await expect(checkoutPage.yourInformationFirstNameInput).toHaveValue('');
        await expect(checkoutPage.yourInformationLastNameInput).toHaveValue('');
        await expect(checkoutPage.yourInformationPostalCodeInput).toHaveValue('');
    });

    test('Should return to checkout page when clicking cancel button', async ({ checkoutPage }) => {
        await checkoutPage.yourInformationCancelButton.click();
        await expect(checkoutPage.checkoutHeading).toHaveText('Your Cart');
        await expect(checkoutPage.quantityLabel).toHaveText('QTY');
        await expect(checkoutPage.descriptionLabel).toHaveText('Description');
        await expect(checkoutPage.getProductItem(0)).toBeVisible();
        await expect(checkoutPage.shoppingCartBadge).toHaveText('1');
    });

    test('Should display error message when trying to continue with all empty inputs', async ({ checkoutPage }) => {
        await checkoutPage.yourInformationContinueButton.click();
        await expect(checkoutPage.yourInformationErrorMessage).toHaveText('Error: First Name is required');
    });

    test('Should display error message when trying to continue with empty First Name', async ({ checkoutPage, checkoutData }) => {
        await checkoutPage.fillYourInformationForm('', checkoutData.lastName, checkoutData.postalCode);
        await checkoutPage.yourInformationContinueButton.click();
        await expect(checkoutPage.yourInformationErrorMessage).toHaveText('Error: First Name is required');
    });

    test('Should display error message when trying to continue with empty Last Name', async ({ checkoutPage, checkoutData }) => {
        await checkoutPage.fillYourInformationForm(checkoutData.firstName, '', checkoutData.postalCode);
        await checkoutPage.yourInformationContinueButton.click();
        await expect(checkoutPage.yourInformationErrorMessage).toHaveText('Error: Last Name is required');
    });

    test('Should display error message when trying to continue with empty Postal Code', async ({ checkoutPage, checkoutData }) => {
        await checkoutPage.fillYourInformationForm(checkoutData.firstName, checkoutData.lastName, '');
        await checkoutPage.yourInformationContinueButton.click();
        await expect(checkoutPage.yourInformationErrorMessage).toHaveText('Error: Postal Code is required');
    });
});

test.describe('@checkout_functionality_overview_and_complete', () => {
    test.beforeEach(async ({ loginPage, productsPage, checkoutPage, checkoutData }) => {
        await loginPage.login(CREDENTIALS.standard.username, CREDENTIALS.standard.password);
        await productsPage.getProductAddToCartButton(0).click();
        await productsPage.shoppingCartLink.click();
        await checkoutPage.checkoutButton.click();
        await checkoutPage.fillYourInformationForm(checkoutData.firstName, checkoutData.lastName, checkoutData.postalCode);
        await checkoutPage.yourInformationContinueButton.click();
        await checkoutPage.expectOverviewPage(1);
    });

    test('Should return to Products page when clicking cancel button on Overview page', async ({ productsPage, checkoutPage }) => {
        await checkoutPage.overviewCancelButton.click();
        await productsPage.expectProductsPage();
        await expect(productsPage.shoppingCartBadge).toHaveText('1');
    });

    test('Should finish checkout and display checkout complete page', async ({ page, checkoutPage }) => {
        await checkoutPage.overviewFinishButton.click();
        await expect(page).toHaveURL(/\/checkout-complete\.html$/);
        await checkoutPage.expectCheckoutCompletePage();
    });

    test('Should return to products page when clicking back home button on checkout complete page', async ({ page, productsPage, checkoutPage }) => {
        await checkoutPage.overviewFinishButton.click();
        await checkoutPage.expectCheckoutCompletePage();
        await checkoutPage.checkoutCompleteBackHomeButton.click();
        await expect(page).toHaveURL(/\/inventory\.html$/);
        await productsPage.expectProductsPage();
    });
});
