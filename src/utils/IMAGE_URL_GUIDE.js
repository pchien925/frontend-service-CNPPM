// IMAGE URL HELPER - Hướng dẫn sử dụng

/**
 * ❌ CÁCH SAI (cũ)
 * const imageUrl = food.imageUrl.startsWith('http')
 *   ? food.imageUrl
 *   : `https://backend-service-cnppm.onrender.com${food.imageUrl}`;
 * 
 * 
 * ✅ CÁCH ĐÚNG (mới)
 * import { buildImageUrl } from '../../utils/imageUrl';
 * const imageUrl = buildImageUrl(food.imageUrl, 'FOOD');
 */

// ============================================
// 1. IMPORT
// ============================================

import { buildImageUrl, isValidImageUrl } from '../../utils/imageUrl';


// ============================================
// 2. CÁC CÁC DÙNG
// ============================================

// Ảnh FOOD (Sản phẩm đồ ăn)
const foodImageUrl = buildImageUrl(food.imageUrl, 'FOOD');

// Ảnh AVATAR (Hình đại diện người dùng)
const avatarUrl = buildImageUrl(user.avatarPath, 'AVATAR');

// Ảnh CATEGORY (Danh mục)
const categoryUrl = buildImageUrl(category.imageUrl, 'CATEGORY');

// Ảnh mặc định
const defaultUrl = buildImageUrl(null, 'FOOD');
// → 'https://backend-service-cnppm.onrender.com/api/file/download/FOOD/placeholder.jpg'


// ============================================
// 3. API RESPONSE FORMAT
// ============================================

// API trả về imageUrl có thể là một trong những format sau:

// Format 1: UUID chỉ (hiếm)
// "c96adcdf-26a2-45ab-8a6d-578b3727df18.jpg"
// → được convert: /api/file/download/FOOD/c96adcdf-26a2-45ab-8a6d-578b3727df18.jpg

// Format 2: Relative path với type
// "AVATAR/7da64780-64f0-4202-a53a-8663a64adb79.jpg"
// → được convert: /api/file/download/AVATAR/7da64780-64f0-4202-a53a-8663a64adb79.jpg

// Format 3: Full URL (bỏ qua xử lý)
// "https://backend-service-cnppm.onrender.com/api/file/download/FOOD/abc.jpg"
// → giữ nguyên: https://backend-service-cnppm.onrender.com/api/file/download/FOOD/abc.jpg


// ============================================
// 4. TRONG COMPONENT JSX
// ============================================

import React from 'react';
import { buildImageUrl } from '../../utils/imageUrl';

export default function MyComponent({ food }) {
  const imageUrl = buildImageUrl(food.imageUrl, 'FOOD');

  return (
    <div>
      <img 
        src={imageUrl} 
        alt={food.name}
        onError={(e) => {
          e.target.src = buildImageUrl(null, 'FOOD'); // Fallback
        }}
      />
    </div>
  );
}


// ============================================
// 5. FILE TYPES HỖ TRỢ
// ============================================

/*
- FOOD: Ảnh sản phẩm đồ ăn
- AVATAR: Hình đại diện người dùng
- CATEGORY: Ảnh danh mục
- ATTACHMENT: File đính kèm
- (Thêm các type khác nếu có)
*/


// ============================================
// 6. LƯU Ý QUAN TRỌNG
// ============================================

/*
✅ ĐÚNG:
- import { buildImageUrl } from '../../utils/imageUrl';
- const url = buildImageUrl(food.imageUrl, 'FOOD');

❌ SAI:
- `https://backend-service-cnppm.onrender.com${food.imageUrl}`
- food.imageUrl.startsWith('http') ? food.imageUrl : ...
- Direct concat URL

✅ LÀM NÀY:
<img src={buildImageUrl(food.imageUrl, 'FOOD')} />

❌ KHÔNG LÀM NÀY:
<img src={`https://backend-service-cnppm.onrender.com${food.imageUrl}`} />
*/


// ============================================
// 7. DANH SÁCH FILES ĐÃ CẬP NHẬT
// ============================================

/*
✅ Đã cập nhật:
- src/components/ui/FoodCard.jsx
- src/pages/FoodDetail/index.js
- src/utils/imageUrl.js (NEW)

✅ Đã hỗ trợ đúng:
- src/pages/Profile/index.js (đã dùng /api/file/download/)

🔍 Nếu gặp issue:
1. Kiểm tra tệp import từ `../../utils/imageUrl`
2. Pass type parameter đúng (FOOD, AVATAR, CATEGORY)
3. Test trong browser DevTools Network tab
4. Xem actual request URL có đúng format không
*/

