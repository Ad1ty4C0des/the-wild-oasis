import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCabinPrice } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useApplyPricing() {
  const queryClient = useQueryClient();

  const { mutate: applyPrice, isLoading: isApplying } = useMutation({
    mutationFn: ({ cabinId, newPrice }) => updateCabinPrice(cabinId, newPrice),
    onSuccess: (updatedCabin) => {
      toast.success(
        `Cabin ${updatedCabin.name} price updated to $${updatedCabin.regularPrice}`
      );
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      queryClient.invalidateQueries({ queryKey: ["pricing-suggestions"] });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to update cabin price");
    },
  });

  return { applyPrice, isApplying };
}
