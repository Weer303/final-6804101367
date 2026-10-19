import { test, expect } from '@playwright/test';

test('ST-02: checkout validation and recovery', async ({ page }) => {
  // ตรวจสอบ Checkout Validation และการแก้ไขข้อมูลจนสั่งซื้อสำเร็จ
  await test.step('Login เพิ่มสินค้า และเปิด Checkout', async () => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await page.locator('.shopping_cart_link').click();
    await page.locator('#checkout').click();
  });

  await test.step('ตรวจสอบ First Name is required', async () => {
    await page.locator('#continue').click();
    await expect(page.locator('[data-test="error"]')).toContainText('First Name is required');
  });

  await test.step('ตรวจสอบ Last Name is required', async () => {
    await page.locator('#first-name').fill('Peeratat');
    await page.locator('#continue').click();
    await expect(page.locator('[data-test="error"]')).toContainText('Last Name is required');
  });

  await test.step('ตรวจสอบ Postal Code is required', async () => {
    await page.locator('#last-name').fill('Hongthong');
    await page.locator('#continue').click();
    await expect(page.locator('[data-test="error"]')).toContainText('Postal Code is required');
  });

  await test.step('แก้ไขข้อมูลและสั่งซื้อสำเร็จ', async () => {
    await page.locator('#postal-code').fill('10110');
    await page.locator('#continue').click();
    await page.locator('#finish').click();
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });
});