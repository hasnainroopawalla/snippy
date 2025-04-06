import * as React from "react";
import { useServices } from "../../contexts";

export const useGetTotalSnippetsCount = () => {
  const { snippetService } = useServices();

  const [totalSnippetsCount, setTotalSnippetsCount] = React.useState<
    number | undefined
  >();

  React.useEffect(() => {
    const getTotalSnippetsCount = async () => {
      snippetService
        .getUsageMetrics()
        .then(usageMetrics => {
          setTotalSnippetsCount(usageMetrics?.totalSnippetsCount);
        })
        .catch(() =>
          console.error("[non-blocking] Error fetching total snippets count"),
        );
    };

    getTotalSnippetsCount();
  }, [snippetService]);

  return { totalSnippetsCount };
};
