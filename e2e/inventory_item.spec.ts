import { test, expect } from '../fixtures/index';
import { CREDENTIALS } from '../helpers/data_factory';

test.describe('@inventory_item_consistency', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.login(CREDENTIALS.standard.username, CREDENTIALS.standard.password);
    });

    for (let i = 0; i < 6; i++) {
        test(`Should display item page when clicking on product item ${i + 1}`, async ({ page, itemPage, productsPage }) => {
            const expectedName = await productsPage.getProductName(i).textContent() ?? '';
            const expectedPrice = await productsPage.getProductPrice(i).textContent() ?? '';
            const expectedDescription = await productsPage.getProductDescription(i).textContent() ?? '';
            await productsPage.getProductName(i).click();
            await expect(page).toHaveURL(/inventory-item\.html/);
            await itemPage.expectItemPage(i);
            await expect(itemPage.itemNameLabel).toHaveText(expectedName);
            await expect(itemPage.itemPriceLabel).toHaveText(expectedPrice);
            await expect(itemPage.itemDescriptionLabel).toHaveText(expectedDescription);
        });
    };

});

test.describe('@inventory_item_components', () => {
    test.beforeEach(async ({ loginPage, productsPage, itemPage }) => {
        await loginPage.login(CREDENTIALS.standard.username, CREDENTIALS.standard.password);
        await productsPage.getProductName(0).click();
        await itemPage.expectItemPage(0);
    });

    test('Should return to products page on clicking back to products button', async ({ page, itemPage, productsPage }) => {
        await itemPage.backToProductsButton.click();
        await expect(page).toHaveURL(/.*inventory/);
        await expect(productsPage.productsHeading).toHaveText('Products');
        await expect(productsPage.productNames).toHaveCount(6);
    });

    test('Should add item to cart on clicking add to cart button', async ({ itemPage, productsPage }) => {
        await itemPage.addToCartButton.click();
        await expect(itemPage.addToCartButton).toBeHidden();
        await expect(itemPage.removeButton).toBeVisible();
        await expect(productsPage.shoppingCartBadge).toHaveText('1');
    });

    test('Should remove item from cart on clicking remove button', async ({ itemPage, productsPage }) => {
        await itemPage.addToCartButton.click();
        await expect(itemPage.addToCartButton).toBeHidden();
        await expect(itemPage.removeButton).toBeVisible();
        await expect(productsPage.shoppingCartBadge).toHaveText('1');
        await itemPage.removeButton.click();
        await expect(itemPage.removeButton).toBeHidden();
        await expect(itemPage.addToCartButton).toBeVisible();
        await expect(productsPage.shoppingCartBadge).not.toBeVisible();
    });
});