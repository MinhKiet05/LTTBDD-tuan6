import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
  } from "react";
  
  import { Phone } from "../types";
  import { fetchPhones } from "../api/phoneApi";
  
  type ProductsContextType = {
    phones: Phone[];
    loading: boolean;
    error: string | null;
    reload: () => Promise<void>;
  };
  
  const ProductsContext = createContext<ProductsContextType | null>(null);
  
  export function ProductsProvider({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const [phones, setPhones] = useState<Phone[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    const reload = useCallback(async () => {
      setLoading(true);
      setError(null);
  
      try {
        const data = await fetchPhones();
  
        // Đảm bảo mỗi sản phẩm có ID để truyền params.
        // Ưu tiên ID từ MockAPI; nếu thiếu thì dùng vị trí trong mảng.
        const normalized = data.map((phone, index) => ({
          ...phone,
          id: String(phone.id ?? index + 1),
        }));
  
        setPhones(normalized);
      } catch (e) {
        setError(
          e instanceof Error ? e.message : "Không thể tải sản phẩm"
        );
      } finally {
        setLoading(false);
      }
    }, []);
  
    useEffect(() => {
      reload();
    }, [reload]);
  
    return (
      <ProductsContext.Provider
        value={{ phones, loading, error, reload }}
      >
        {children}
      </ProductsContext.Provider>
    );
  }
  
  export function useProducts() {
    const context = useContext(ProductsContext);
  
    if (!context) {
      throw new Error("useProducts phải nằm trong ProductsProvider");
    }
  
    return context;
  }