import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { ensureFreshDemoData } from "../../services/demoSimulator";

/**
 * Hook that checks data freshness on dashboard mount and
 * triggers auto-seeding if the demo data is stale.
 *
 * After seeding, it invalidates all React Query caches so
 * the dashboard re-fetches and shows the fresh data.
 */
export function useDemoSimulator() {
  const queryClient = useQueryClient();
  const hasRun = useRef(false);

  useEffect(() => {
    // Only run once per dashboard mount
    if (hasRun.current) return;
    hasRun.current = true;

    async function checkAndSeed() {
      const beforeTimestamp = localStorage.getItem("wild_oasis_last_seed");

      await ensureFreshDemoData();

      const afterTimestamp = localStorage.getItem("wild_oasis_last_seed");

      // If a new seed happened, invalidate all queries so the UI refreshes
      if (afterTimestamp !== beforeTimestamp) {
        console.log("[DemoSimulator] 🔄 Refreshing dashboard data...");
        queryClient.invalidateQueries({ queryKey: ["bookings"] });
        queryClient.invalidateQueries({ queryKey: ["stays"] });
        queryClient.invalidateQueries({ queryKey: ["cabins"] });
        queryClient.invalidateQueries({ queryKey: ["settings"] });
      }
    }

    checkAndSeed();
  }, [queryClient]);
}

