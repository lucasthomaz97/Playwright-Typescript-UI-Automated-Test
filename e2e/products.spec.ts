import { test, expect } from '../fixtures/index';

test.describe('@products', () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.login('standard_user', 'secret_sauce');
    });

    test('Should Display Menu options when clicking menu button', async ({ productsPage }) => {
        await productsPage.menuButton.click();
        await expect(productsPage.allItemsButton).toBeVisible();
        await expect(productsPage.aboutButton).toBeVisible();
        await expect(productsPage.logoutButton).toBeVisible();
        await expect(productsPage.menuCloseButton).toBeVisible();
    });

    test('Should logout successfully', async ({ loginPage, productsPage }) => {
        await expect(productsPage.productsHeading).toBeVisible();
        await productsPage.menuButton.click();
        await productsPage.logoutButton.click();
        await loginPage.expectLoginPage();
    });

    test('Should close menu when clicking the close menu button', async ({ productsPage }) => {
        await productsPage.menuButton.click();
        await expect(productsPage.logoutButton).toBeVisible();
        await productsPage.menuCloseButton.click();
        await expect(productsPage.allItemsButton).toBeHidden();
        await expect(productsPage.aboutButton).toBeHidden();
        await expect(productsPage.logoutButton).toBeHidden();
        await expect(productsPage.menuCloseButton).toBeHidden();
        await productsPage.expectProductsPage();
    });

    test('Should display six products on products page', async ({ productsPage }) => {
        await expect(productsPage.productNames).toHaveCount(6);
    });

    test('Should order Z to A correctly', async ({ productsPage }) => {
        await productsPage.productSortSelect.selectOption('za');

        const products = await productsPage.productNames.allTextContents();
        const sortedProducts = [...products].sort().reverse();
        expect(products).toEqual(sortedProducts);
    });

    test('Should order A to Z correctly', async ({ productsPage }) => {
        await productsPage.productSortSelect.selectOption('az');

        const products = await productsPage.productNames.allTextContents();
        const sortedProducts = [...products].sort();
        expect(products).toEqual(sortedProducts);
    });

    test('Should order by price low to high correctly', async ({ productsPage }) => {
        await productsPage.productSortSelect.selectOption('lohi');

        const prices = await productsPage.productPrices.allTextContents();
        const pricesAsNumbers = prices.map(p => parseFloat(p.replace('$', '')));
        const sortedPrices = [...pricesAsNumbers].sort((a, b) => a - b);
        expect(pricesAsNumbers).toEqual(sortedPrices);
    });

    test('Should order by price high to low correctly', async ({ productsPage }) => {
        await productsPage.productSortSelect.selectOption('hilo');

        const prices = await productsPage.productPrices.allTextContents();
        const pricesAsNumbers = prices.map(p => parseFloat(p.replace('$', '')));
        const sortedPrices = [...pricesAsNumbers].sort((a, b) => b - a);
        expect(pricesAsNumbers).toEqual(sortedPrices);
    });

    test('Should toggle add to cart and remove buttons for each product', async ({ productsPage }) => {
        for (let i = 0; i < 6; i++) {
            await productsPage.getProductAddToCartButton(i).click();
            await expect(productsPage.getProductRemoveButton(i)).toBeVisible();
            await expect(productsPage.getProductAddToCartButton(i)).toBeHidden();
            await expect(productsPage.shoppingCartBadge).toHaveText('1');
            await productsPage.getProductRemoveButton(i).click();
            await expect(productsPage.getProductAddToCartButton(i)).toBeVisible();
            await expect(productsPage.getProductRemoveButton(i)).toBeHidden();
        }
    });

    test('Should update shopping cart badge correctly when adding and removing products', async ({ productsPage }) => {
        await expect(productsPage.shoppingCartBadge).not.toBeVisible();

        for (let i = 1; i <= 6; i++) {
            await productsPage.getProductAddToCartButton(i - 1).click();
            await expect(productsPage.shoppingCartBadge).toHaveText(`${i}`);
        }

        for (let i = 5; i >= 0; i--) {
            await productsPage.getProductRemoveButton(i).click();
            if (i === 0) {
                await expect(productsPage.shoppingCartBadge).not.toBeVisible();
            } else {
                await expect(productsPage.shoppingCartBadge).toHaveText(`${i}`);
            }
        }
    });

    for (let i = 0; i < 6; i++) {
        test(`Should display product information for product ${i + 1}`, async ({ productsPage }) => {
            await expect(productsPage.getProductName(i)).toBeVisible();
            await expect(productsPage.getProductImage(i)).toBeVisible();
            await expect(productsPage.getProductPrice(i)).toBeVisible();
            await expect(productsPage.getProductDescription(i)).toBeVisible();
            await expect(productsPage.getProductAddToCartButton(i)).toBeVisible();
        });
    }
});