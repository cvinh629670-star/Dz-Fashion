/* ================================================================
   DZ-FASHION | KHO DỮ LIỆU OUTFIT - CHỈ SỬA PHẦN NÀY ĐỂ THÊM OUTFIT
   Bước 1: Sao chép một đối tượng { ... } trong mảng OUTFITS.
   Bước 2: Đổi id (duy nhất), tên, phong cách, giới tính, giá, ảnh, link.
   Bước 3: Lưu index.html. Sản phẩm tự hiển thị ở Nam/Nữ/Xu hướng.
   Ảnh: dùng "assets/ten-anh.webp" hoặc URL https://... (nếu có).
   Link affiliate: dán link Shopee/TikTok thật; để "" nếu chưa có.
   Giá ví dụ bên dưới chỉ là DỮ LIỆU DEMO, không phải giá bán thực.
   ================================================================ */
const OUTFITS = [
  /*{
    id: 'DZ-M001',
    ten: 'Blue Hour Campus',
    phongCach: 'Korean Campus',
    gioiTinh: 'nam',          // 'nam' | 'nu' | 'unisex'
    gia: 650000,             // VND; null nếu chưa biết giá
    anh: '',                 // URL hoặc đường dẫn ảnh, để '' dùng ảnh minh họa
    linkAffiliate: '',       // URL thật của sản phẩm / outfit
    moTa: 'Phối xanh navy – đen, trẻ trung và tối giản.',
    danhMuc: 'campus',
    noiBat: true,
    trangThai: 'demo'        // 'demo' | 'published'
  },*/
  {
    id: 'DZ-M001',
    ten: 'Blue Hour Campus',
    phongCach: 'Korean Campus',
    gioiTinh: 'nam',          // 'nam' | 'nu' | 'unisex'
    gia: 650000,             // VND; null nếu chưa biết giá
    anh: '',                 // URL hoặc đường dẫn ảnh, để '' dùng ảnh minh họa
    linkAffiliate: '',       // URL thật của sản phẩm / outfit
    moTa: 'Phối xanh navy – đen, trẻ trung và tối giản.',
    danhMuc: 'campus',
    noiBat: true,
    trangThai: 'demo'        // 'demo' | 'published'
  }
];

// Không cần sửa code bên dưới để thêm outfit.
window.DzOutfits = Object.freeze(OUTFITS.map(o => Object.freeze({...o})));
window.DzOutfitUtils = {
  formatPrice: value => typeof value === 'number' ? new Intl.NumberFormat('vi-VN').format(value)+' ₫' : 'Liên hệ',
  forPage(page) {
    const all=window.DzOutfits;
    if(page==='nam') return all.filter(o=>o.gioiTinh==='nam'||o.gioiTinh==='unisex');
    if(page==='nu') return all.filter(o=>o.gioiTinh==='nu'||o.gioiTinh==='unisex');
    if(page==='xuhuong') return []; // Xu hướng dành riêng cho Monetag, không hiển thị outfit
    return all;
  }
};
