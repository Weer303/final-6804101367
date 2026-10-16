# Software Testing Final Exam - Playwright (TypeScript)

**รายวิชา:** Software Testing  
**ระบบเป้าหมาย:** SauceDemo (https://www.saucedemo.com)  
**ผู้จัดทำ:** นาย พีรทัต หงษ์ทอง (6804101367)

## 📋 คำอธิบายสถาปัตยกรรม Integration Testing

ตามโจทย์ในบทที่ 2 มีการทดสอบการบูรณาการระบบ 2 รูปแบบ ดังนี้ครับ:

### 1. IT-01: Top-Down Integration Testing ด้วย Stub
* **ส่วนที่เป็น Real:** ระบบการเข้าสู่ระบบ (Login Form) และการตรวจสอบหน้าเว็บไซต์จริง (Real Authentication & Redirection to `inventory.html`)
* **ส่วนที่เป็น Stub:** การจำลอง DOM ระดับเบราว์เซอร์ด้วยฟังก์ชัน `page.setContent()` เพื่อสร้างหน้า Inventory จำลอง (`Mock Inventory Ready` พร้อมสินค้าจำลอง `Mock Backpack` และ `Mock Bike Light`) แทนที่จะโหลดรายการสินค้าจริงจากหลังบ้าน

### 2. IT-02: Bottom-Up Integration Testing ด้วย Driver
* **บทบาทของ Driver:** ฟังก์ชัน `driverOpenInventory()` ทำหน้าที่เป็น Driver ในการข้ามหน้า Login Form โดยการเซ็ตค่า Cookie (`session-username` เป็น `standard_user`) ผ่าน `BrowserContext.addCookies()` แล้วสั่งเปิดหน้า `inventory.html` โดยตรง
* **ส่วนที่เป็น Real:** หน้า Inventory จริงและตะกร้าสินค้าจริง (Real UI และการโต้ตอบปุ่ม Add to Cart / Shopping Cart จริงบนเว็บไซต์ SauceDemo)

---

## 🚀 วิธีการรันการทดสอบ

1. ติดตั้ง Dependencies:
   ```bash
   npm install