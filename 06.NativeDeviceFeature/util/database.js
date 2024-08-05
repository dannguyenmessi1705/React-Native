import * as Sqlite from "expo-sqlite";

const database = Sqlite.openDatabaseSync("places.db"); // Mở hoặc tạo database có tên places.db nếu chưa tồn tại

export function init() {
  return database.runAsync(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            imageUri TEXT NOT NULL,
            address TEXT NOT NULL,
            lat REAL NOT NULL,
            lng REAL NOT NULL
        )
    `); // Tạo bảng places nếu chưa tồn tại với các trường id, title, imageUri, address, lat, lng
}

export function insertPlace(place) {
  return database.runAsync(
    `
        INSERT INTO places (title, imageUri, address, lat, lng)
        VALUES (?, ?, ?, ?, ?)
        `,
    [
      place.title,
      place.imageUri,
      place.address,
      place.location.lat,
      place.location.lng,
    ] // Các biến lần lượt thay thế cho dấu ? trong câu lệnh SQL
  ); // Thêm dữ liệu vào bảng places với các trường title, imageUri, address, lat, lng
}

export async function getAllPlaces() {
  return await database.getAllAsync(`SELECT * FROM places`); // Lấy tất cả dữ liệu từ bảng places
}

export async function getPlace(id) {
  return await database.getFirstAsync(`SELECT * FROM places WHERE id = ?`, [
    id,
  ]); // Lấy dữ liệu từ bảng places với điều kiện id
}
