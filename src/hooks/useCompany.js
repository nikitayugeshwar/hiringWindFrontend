import api from "@/utils/api";
import { useCallback, useEffect, useState } from "react";

export const useCompany = () => {
  const [companyData, setCompanyData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchCompany = useCallback(async () => {
    try {
      setLoading(true);
      const response = await api.get(`/api/company/getCompany`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setCompanyData(response.data.data || {});
      }
    } catch (error) {
      console.log("error while fetching the company", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCompany();
  }, [fetchCompany]);

  return { companyData, setCompanyData, loading, refetch: fetchCompany };
};
