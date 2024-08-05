const GOOGLE_API_KEY = "AIzaSyD2mP_sDlloOcwv6OLmYtATOJIcnDhcZcg";

export function getMapPreview(lat, lng) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
} // Hàm trả về ảnh vị trí đã chọn dựa vào lat, lng sử dụng Google Static Maps API

export async function getAddress(lat, lng) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch address!");
  }

  const data = await response.json();
  const address = data.results[0].formatted_address;
  return address;
} // Hàm trả về địa chỉ dựa vào lat, lng sử dụng Google Geocoding API (Convert lat, lng thành địa chỉ có tên đường, thành phố, quốc gia,...)
