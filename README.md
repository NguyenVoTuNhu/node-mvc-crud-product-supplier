# Node MVC CRUD Product Supplier

Ứng dụng CRUD quản lý **Nhà cung cấp** và **Sản phẩm** được xây dựng bằng Node.js theo kiến trúc MVC.

## 🚀 Công nghệ sử dụng

- **Node.js + Express**: Xây dựng server
- **MongoDB + Mongoose**: Lưu trữ dữ liệu
- **EJS + Bootstrap**: Hiển thị giao diện
- **Swagger**: Mô tả API
- **dotenv**: Quản lý biến môi trường
- **method-override**: Hỗ trợ PUT/DELETE từ form HTML

## 📂 Chức năng chính

### 🟩 Nhà cung cấp (Suppliers)
- Thêm mới, chỉnh sửa, xóa
- Xem danh sách
- API JSON: `/suppliers/api`

### 🟦 Sản phẩm (Products)
- Thêm mới, chỉnh sửa, xóa
- Xem danh sách
- API JSON: `/products/api`

### 📜 Swagger API Docs
- Truy cập `http://localhost:3000/api-docs` để xem mô tả API

## ⚙️ Cấu hình dự án

Tạo file `.env` trong thư mục gốc:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ten_cua_database
