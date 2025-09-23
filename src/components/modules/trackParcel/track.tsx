
import { parcelApi } from "@/redux/features/parcel/parcelApi";
import { useAppDispatch } from "@/redux/hooks";
import type { IParcelTrackData, IResponse } from "@/types";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { toast } from "sonner";
import TrackingHero from "./tracking-hero";
import TrackingSupport from "./tracking-support";
import TrackingResults from "./tracking-results";


function Track() {
  const [searchParams] = useSearchParams();

  const trackingId = searchParams.get("trackingId") || undefined;
  const dispatch = useAppDispatch();

  const [data, setData] = useState<IResponse<IParcelTrackData> | null>(null);

  const [fetchState, setFetchState] = useState<{
    isLoading: boolean;
    isError: boolean;
    errorMessage: string;
  }>({
    isLoading: false,
    isError: false,
    errorMessage: "",
  });

  useEffect(() => {
    if (!trackingId) {
      setFetchState({ isLoading: false, isError: false, errorMessage: "" });
      setData(null);
      return;
    }
    setFetchState({ isLoading: true, isError: false, errorMessage: "" });
    const result = dispatch(parcelApi.endpoints.trackParcel.initiate(trackingId)).unwrap();
    result
      .then((res) => {
        setFetchState({ isLoading: false, isError: false, errorMessage: "" });
        setData(res);
        // Smooth scroll to parcel details after data loads
        setTimeout(() => {
          const parcelDetailsElement = document.getElementById("tracking-results");
          if (parcelDetailsElement) {
            parcelDetailsElement.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }, 100);
      })
      .catch((err) => {
        setFetchState({
          isLoading: false,
          isError: true,
          errorMessage: err.data.message,
        });
        toast.error(err.data.message || "Something went wrong");
      })
      .finally(() => {
        setFetchState({ isLoading: false, isError: false, errorMessage: "" });
      });
  }, [trackingId, dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-secondary/10">
      <TrackingHero isLoading={fetchState.isLoading} />

      {!fetchState.isLoading && !fetchState.isError && data && <TrackingResults data={data} />}

      <TrackingSupport />
    </div>
  );
}

export default Track;
