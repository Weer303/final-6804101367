import { test, expect } from '@playwright/test';

test('IT-02: DRIVER login state -> REAL Inventory and Cart', async ({ browser }) => {
  // ใช้ Driver เตรียมสถานะ Login เพื่อทดสอบ Inventory และ Cart จริง
  const context = await browser.newContext();
  const page = await context.newPage();

  await test.step('สร้าง Driver และเปิด Inventory', async () => {
    await context.addCookies([
      { name: 'session-username', value: 'standard_user', domain: 'www.saucedemo.com', path: '/' }
    ]);
    await page.goto('https://www.saucedemo.com/inventory.html');
  });

  await test.step('ตรวจสอบ Inventory จริง', async () => {
    await expect(page.locator('.inventory_item')).toHaveCount(6);
  });

  await test.step('เพิ่มสินค้า 2 รายการ', async () => {
    await page.locator('#add-to-cart-sauce-labs-backpack').click();
    await page.locator('#add-to-cart-sauce-labs-bike-light').click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('2');
  });

  await test.step('ตรวจสอบสินค้าใน Cart', async () => {
    await page.locator('.shopping_cart_link').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
  });

  await context.close();
});