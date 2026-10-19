import { test, expect } from '@playwright/test';

test('IT-01: top-down REAL Login -> browser-level Inventory STUB', async ({ page }) => {
  // ทดสอบ Login จริงร่วมกับ Inventory Stub ที่จำลองด้วย page.setContent()
  await test.step('Login ผ่านหน้าเว็บไซต์จริง', async () => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  await test.step('สร้าง Inventory Stub', async () => {
    await page.setContent(`
      <div id="inventory_container">
        <span class="title">Products (Stub)</span>
        <div class="inventory_item">Mock Backpack - $29.99</div>
        <div class="inventory_item">Mock Bike Light - $9.99</div>
      </div>
    `);
  });

  await test.step('ตรวจสอบผลจาก Stub', async () => {
    await expect(page.locator('.title')).toHaveText('Products (Stub)');
    await expect(page.locator('.inventory_item')).toHaveCount(2);
  });
});