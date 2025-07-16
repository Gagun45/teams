import { getMyTeams } from "@/lib/helper/team.helper";
import SidebarHeader from "./SidebarHeader";
import SidebarTeamLink from "./SidebarTeamLink";

const Sidebar = async () => {
  const teams = await getMyTeams();

  return (
    <div className="min-h-screen w-16 lg:w-32 bg-main hidden md:flex flex-col">
      <SidebarHeader />
      <div className="flex flex-col items-center gap-4 lg:gap-6 pt-4 lg:pt-6">
        {teams &&
          teams.map((team) => <SidebarTeamLink key={team.id} team={team} />)}
      </div>
    </div>
  );
};
export default Sidebar;
