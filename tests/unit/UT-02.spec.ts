import { test, expect } from '@playwright/test';

test('UT-02: product button state Add to cart -> Remove -> Add to cart', async ({ page }) => {
  await test.step('Login เข้าสู่ระบบ', async () => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
  });

  await test.step('เพิ่มสินค้าเข้า Cart', async () => {
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await expect(page.locator('#remove-sauce-labs-backpack')).toHaveText('Remove');
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
  });

  await test.step('ลบสินค้าออกจาก Cart', async () => {
    await page.locator('#remove-sauce-labs-backpack').click();
    await expect(page.locator('#add-to-cart-sauce-labs-backpack')).toHaveText('Add to cart');
  });
});