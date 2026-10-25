import { Phone } from "../types";

const API_URL = "https://6acb47c1ef37b1504077b1ac.mockapi.io";

export async function fetchPhone(id: string): Promise<Phone> {
  const response = await fetch(`${API_URL}/phones`);

  if (!response.ok) {
    throw new Error(`Lỗi API: ${response.status}`);
  }

  const data: Phone[] = await response.json();

  console.log("Dữ liệu từ API:", data);

  // Tạm lấy sản phẩm đầu tiên vì API chưa có ID
  const phone = data[0];

  if (!phone) {
    throw new Error("Không tìm thấy sản phẩm");
  }

  return {
    ...phone,
    id: phone.id ?? id,
  };
}