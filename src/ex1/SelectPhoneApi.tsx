import React, {
    useState,
    useEffect,
    useCallback,
  } from "react";
  
  import { Phone } from "../types";
  
  import { fetchPhone } from "../api/phoneApi";
  
  import { Loading } from "../components/Loading";
  
  import { ErrorBox } from "../components/ErrorBox";
  
  import { SelectPhoneApp } from "./SelectPhoneApp";
  
  export function SelectPhoneApi() {
  
    const [phone, setPhone] = useState<Phone | null>(null);
  
    const [error, setError] = useState<string | null>(null);
  
    // TODO 1 + TODO 2
    const load = useCallback(async () => {
  
      setError(null);
      setPhone(null);
  
      try {
        const data = await fetchPhone("1");
  
        setPhone(data);
  
      } catch (e) {
  
        setError(
          e instanceof Error
            ? e.message
            : "Có lỗi xảy ra"
        );
  
      }
  
    }, []);
  
    // TODO 3
    useEffect(() => {
      load();
    }, [load]);
  
    // TODO 4
    if (error) {
      return (
        <ErrorBox
          message={error}
          onRetry={load}
        />
      );
    }
  
    // TODO 5
    if (!phone) {
      return <Loading />;
    }
  
    // TODO 6
    return <SelectPhoneApp phone={phone} />;
  }