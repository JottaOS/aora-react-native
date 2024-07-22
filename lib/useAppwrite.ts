import { useEffect, useState } from "react";
import { Alert } from "react-native";

const useAppwrite = (fn: Function) => {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fn();
      setData(response);
    } catch (error) {
      Alert.alert("Error", String(error));
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = () => fetchData();

  return {
    data,
    isLoading,
    refetch,
  };
};

export default useAppwrite;
