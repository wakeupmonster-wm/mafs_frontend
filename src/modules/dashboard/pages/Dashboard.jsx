import { ChartAreaInteractive } from "@/components/shared/chart-area-interactive";
import { DataTable } from "@/components/shared/data-table";
import { SectionCards } from "@/components/shared/section-cards";
import data from "@/app/data/data.json";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardKPIs } from "../store/dashboard.slice";
import { useEffect } from "react";

const Dashboard = () => {
  const dispatch = useDispatch();
  // const { token } = useSelector((state) => state.auth);
  const { stats, loading, error } = useSelector((state) => state.dashboard);

  // console.log("token: ", token);

  useEffect(() => {
    if (!stats) dispatch(fetchDashboardKPIs());
  }, [dispatch, stats]);

  return (
    <>
      <div className="flex flex-1 flex-col font-jakarta">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 px-4 md:gap-6">
            <SectionCards stats={stats} loading={loading} error={error} />
            <div className="px-2">
              <ChartAreaInteractive
                kpiData={stats}
                loading={loading}
                error={error}
              />
            </div>
            <DataTable kpiData={stats} data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
