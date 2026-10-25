import { Phone } from "../types";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function fetchPhones(): Promise<Phone[]> {
  if (!API_URL) {
    throw new Error("Chưa cấu hình API URL");
  }

  const response = await fetch(`${API_URL}/phones`);

  if (!response.ok) {
    throw new Error(`Lỗi API: ${response.status}`);
  }

  const data: Phone[] = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Dữ liệu API không phải danh sách sản phẩm");
  }

  console.log("Danh sách điện thoại từ API:", data);

  return data;
}

// Dùng cho Bài 2
export async function fetchPhone(id: string): Promise<Phone> {
  const phones = await fetchPhones();

  const phone = phones.find((p) => String(p.id) === id);

  if (!phone) {
    throw new Error(`Không tìm thấy sản phẩm có ID ${id}`);
  }

  return phone;
}