import { ChartAreaInteractive } from "@/components/shared/chart-area-interactive";
import { DataTable } from "@/components/shared/data-table";
import { SectionCards } from "@/components/shared/section-cards";
import data from "@/app/data/data.json";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { token } = useSelector((state) => state.auth);
  console.log("token: ", token);

  return (
    <>
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 px-4 md:gap-6">
            <SectionCards />
            <div className="px-2">
              <ChartAreaInteractive />
            </div>
            <DataTable data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
