import { useQuery } from "@tanstack/react-query";
import { getPricingSuggestions } from "../../services/apiPricing";

export function usePricingSuggestions() {
  const { data, isLoading, error, refetch, isFetching } = useQuery({
    queryKey: ["pricing-suggestions"],
    queryFn: getPricingSuggestions,
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return {
    suggestions: data?.suggestions || [],
    analytics: data?.analytics || [],
    isLoading,
    isFetching,
    error,
    refetch,
    isFallback: Boolean(data?.isFallback),
  };
}

