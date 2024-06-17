import { QueryKeys } from "utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { IToken } from "types";

export const useTokens = () => {
  const [tokens, setTokens] = useState<IToken[]>([]);
  const {
    data,
    isLoading,
  }: { data: any; refetch: () => void; isLoading: boolean } = useQuery({
    queryKey: [QueryKeys.GET_PRICES],
    queryFn: () => axios.get(`${process.env.REACT_APP_BASE_URL}/prices.json`),
    enabled: !!process.env.REACT_APP_BASE_URL,
  });

  useEffect(() => {
    if (data) {
      setTokens(data?.data);
    }
  }, [data]);

  return {
    isLoading,
    tokens,
  };
};
