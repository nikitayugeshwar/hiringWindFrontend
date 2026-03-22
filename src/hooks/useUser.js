import api from "@/utils/api";
import { useEffect, useState } from "react";

export const useUser = () => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const resposne = await api.get(`/api/user/getUserById`, {
          withCredentials: true,
        });
        console.log("resposne", resposne);
        if (resposne.data.success) {
          //   alert(resposne.data.message);
          setUserData(resposne.data.data);
        }
      } catch (error) {
        console.log("error while fetching the user", error);
      }
    };
    fetchUser();
  }, []);

  return { userData };
};
