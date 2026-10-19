import { test, expect } from '@playwright/test';

test.describe('UT-01: Login Form Validation', () => {
  test('UT-01.1: empty username and password', async ({ page }) => {
    await test.step('เปิดหน้า Login และส่งฟอร์มเปล่า', async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.locator('#login-button').click();
    });
    await test.step('ตรวจสอบ Error', async () => {
      await expect(page.locator('[data-test="error"]')).toContainText('Username is required');
    });
  });

  test('UT-01.2: missing password', async ({ page }) => {
    await test.step('เปิดหน้า Login กรอก User เว้น Pass', async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.locator('#user-name').fill('standard_user');
      await page.locator('#login-button').click();
    });
    await test.step('ตรวจสอบ Error', async () => {
      await expect(page.locator('[data-test="error"]')).toContainText('Password is required');
    });
  });

  test('UT-01.3: invalid login details', async ({ page }) => {
    await test.step('กรอกข้อมูลผิด', async () => {
      await page.goto('https://www.saucedemo.com/');
      await page.locator('#user-name').fill('invalid_user');
      await page.locator('#password').fill('wrong_password');
      await page.locator('#login-button').click();
    });
    await test.step('ตรวจสอบ Error', async () => {
      await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match');
    });
  });
});