import { Page, Locator, expect } from '@playwright/test';

export class ItemPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get backToProductsButton(): Locator {
        return this.page.locator('[data-test="back-to-products"]');
    }

    get itemNameLabel(): Locator {
        return this.page.locator('[data-test="inventory-item-name"]');
    }

    get itemDescriptionLabel(): Locator {
        return this.page.locator('[data-test="inventory-item-desc"]');
    }

    get itemPriceLabel(): Locator {
        return this.page.locator('[data-test="inventory-item-price"]');
    }

    get addToCartButton(): Locator {
        return this.page.locator('[data-test="add-to-cart"]');
    }

    get removeButton(): Locator {
        return this.page.locator('[data-test="remove"]');
    }

    private readonly IMAGE_SLUGS = [
        'item-sauce-labs-backpack-img',
        'item-sauce-labs-bike-light-img',
        'item-sauce-labs-bolt-t-shirt-img',
        'item-sauce-labs-fleece-jacket-img',
        'item-sauce-labs-onesie-img',
        'item-test.allthethings()-t-shirt-(red)-img',
    ];

    getItemImage(i: number): Locator {
        return this.page.locator(`[data-test="${this.IMAGE_SLUGS[i]}"]`);
    }

    async expectItemPage(i: number) {
        await expect(this.getItemImage(i)).toBeVisible();
        await expect(this.itemNameLabel).not.toBeEmpty();
        await expect(this.itemDescriptionLabel).not.toBeEmpty();
        await expect(this.itemPriceLabel).not.toBeEmpty();
        await expect(this.addToCartButton).toBeVisible();
        await expect(this.backToProductsButton).toBeVisible();
    }
};