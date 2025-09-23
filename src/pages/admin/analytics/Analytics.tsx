import Error from "@/components/Error";
import Information from "@/components/Information";
import Loading from "@/components/Loading";
import OverviewCards from "@/components/modules/admin/parcels/analytics/Overview-cards";
import ParcelCharts from "@/components/modules/admin/parcels/analytics/Parcel-charts";
import { useGetParcelAnalyticsQuery } from "@/redux/features/parcel/parcelApi";

function Analytics() {
  const { data, isLoading, isError, error } =
    useGetParcelAnalyticsQuery(undefined);

  if (isLoading) {
    return <Loading message="Loading analytics data..." />;
  }

  if (!isLoading && isError) {
    return <Error message={(error as any)?.message} />;
  }

  if (!isLoading && !isError && data && !data?.data) {
    return <Information message="No parcel data available" />;
  }

  return (
    <div className="space-y-8 p-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Analytics Dashboard
        </h1>
        <p className="text-muted-foreground">
          Comprehensive overview of parcel delivery statistics and insights
        </p>
      </div>

      <OverviewCards data={data?.data} />
      <ParcelCharts data={data?.data} />
    </div>
  );
}

export default Analytics;
