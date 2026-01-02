import React from 'react';

const FoodCard = ({ food, onOrder }) => {
  if (!food) return null;

  const {
    name = 'Không có tên',
    description,
    basePrice,
    imageUrl,
    category,
    tags,
    cookingTime,
    options,
  } = food;

  const safeTags = Array.isArray(tags) ? tags : [];
  const safeOptions = Array.isArray(options) ? options : [];

  const categoryLabel =
    typeof category === 'object' && category !== null
      ? category.name
      : typeof category === 'string'
        ? category
        : null;

  const priceNumber =
    basePrice === null || basePrice === undefined ? null : Number(basePrice);

  const priceText =
    priceNumber === null || Number.isNaN(priceNumber)
      ? 'Liên hệ'
      : `${priceNumber.toLocaleString('vi-VN')}đ`;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden">
        <img
          src={
            imageUrl || 'https://via.placeholder.com/400x300?text=Food+Image'
          }
          alt={name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          loading="lazy"
        />

        {categoryLabel && (
          <span className="absolute top-2 right-2 bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {categoryLabel}
          </span>
        )}

        {typeof cookingTime === 'number' && (
          <span className="absolute top-2 left-2 bg-gray-800 bg-opacity-75 text-white px-2 py-1 rounded text-xs">
            🕐 {cookingTime} phút
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{name}</h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {description || 'Món ăn ngon đặc biệt'}
        </p>

        {safeTags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {safeTags.slice(0, 3).map((tag, index) => {
              const label =
                typeof tag === 'object' && tag !== null
                  ? tag.name
                  : String(tag);
              return (
                <span
                  key={tag?.id ?? `${label}-${index}`}
                  className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-xs"
                >
                  #{label}
                </span>
              );
            })}
          </div>
        )}

        {safeOptions.length > 0 && (
          <p className="text-gray-500 text-xs mb-2">
            {safeOptions.length} tùy chọn có sẵn
          </p>
        )}

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-orange-500">
            {priceText}
          </span>

          <button
            onClick={() => onOrder?.(food)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
          >
            Đặt món
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
