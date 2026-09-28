# [Mã sinh viên] - BaiTH01

Trang web portfolio cá nhân được xây dựng bằng HTML, CSS và JavaScript thuần.

## Cách chạy

1. Tải hoặc sao chép toàn bộ thư mục dự án.
2. Mở tệp `index.html` bằng trình duyệt.
3. Thay các thông tin mẫu: tên, email, liên kết GitHub/LinkedIn và mã sinh viên trong tệp `index.html`.

## Các yêu cầu đã thực hiện

### HTML

- Header có logo, menu điều hướng và nút đổi giao diện.
- Phần giới thiệu cá nhân, về bản thân, danh sách kỹ năng.
- Có 4 dự án mẫu (nhiều hơn yêu cầu tối thiểu 3 dự án).
- Form liên hệ gồm họ tên, email, chủ đề và lời nhắn.
- Footer có năm hiện tại tự động cập nhật.

### CSS

- Dùng CSS Grid cho các khối hero, kỹ năng, dự án, liên hệ; Flexbox cho menu, các nút và thành phần nhỏ.
- Hover cho nút, thẻ kỹ năng, thẻ dự án, liên kết và nút đổi giao diện.
- Responsive với 3 mốc: desktop (mặc định), tablet (`max-width: 980px`), mobile (`max-width: 700px`) và điều chỉnh thêm cho màn hình rất nhỏ (`max-width: 380px`).

### JavaScript

1. Menu hamburger trên mobile.
2. Dark/light mode, có lưu giao diện đã chọn bằng `localStorage`.
3. Smooth scroll và tự động đánh dấu menu của khu vực đang xem.
4. Lọc dự án theo tag và tìm kiếm theo từ khóa.
5. Bộ đếm ký tự tối đa 500 cho lời nhắn.
6. Validate form: tên, email, chủ đề, lời nhắn; hiển thị lỗi cạnh từng trường.
7. Hiệu ứng xuất hiện khi cuộn với `IntersectionObserver`.
8. Tự động hiển thị năm hiện tại ở footer.

## Đẩy bài lên GitHub

Sau khi thay `[Mã sinh viên]` bằng mã thật, chạy các lệnh sau trong thư mục dự án:

```bash
git init
git add .
git commit -m "Hoàn thành bài thực hành 01"
git branch -M main
git remote add origin https://github.com/<tai-khoan-github>/<mã-sinh-viên>-BaiTH01.git
git push -u origin main
```

Trước đó, hãy tạo repository trên GitHub với tên chính xác là `<mã sinh viên>-BaiTH01` (không tạo README từ GitHub để tránh xung đột khi push). Nếu để repository private, vào **Settings → Collaborators** và mời username `anhttptit`.

Cuối cùng, sao chép URL repository (ví dụ `https://github.com/tai-khoan/2212xxxx-BaiTH01`) và dán vào ô trả lời trên Slink rồi nộp bài.
