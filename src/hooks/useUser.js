import api from "@/utils/api";
import { useCallback, useEffect, useState } from "react";

export const useUser = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get(`/api/user/getUserById`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setUserData(response.data.data || {});
      }
    } catch (error) {
      console.log("error while fetching the user", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { userData, setUserData, loading, refetch: fetchUser };
};
