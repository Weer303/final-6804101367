import { test, expect } from '@playwright/test';

test('ST-01: complete purchase of two products', async ({ page }) => {
  // ทดสอบการซื้อ Backpack และ Bike Light ตั้งแต่ Login จนสั่งซื้อสำเร็จ
  await test.step('Login และตรวจสอบ Inventory', async () => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page).toHaveURL(/inventory.html/);
  });

  await test.step('เพิ่มสินค้าสองรายการ', async () => {
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await page.locator('#add-to-cart-sauce-labs-bike-light').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
  });

  await test.step('ตรวจสอบ Cart', async () => {
    await page.locator('.shopping_cart_link').click();
    await page.locator('#checkout').click();
  });

  await test.step('กรอก Checkout Information', async () => {
    await page.locator('#first-name').fill('Peeratat');
    await page.locator('#last-name').fill('Hongthong');
    await page.locator('#postal-code').fill('10110');
    await page.locator('#continue').click();
  });

  await test.step('ตรวจสอบ Overview และสั่งซื้อ', async () => {
    await expect(page).toHaveURL(/checkout-step-two.html/);
    await page.locator('#finish').click();
  });

  await test.step('ตรวจสอบ Order Complete', async () => {
    await expect(page).toHaveURL(/checkout-complete.html/);
    await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
  });
});