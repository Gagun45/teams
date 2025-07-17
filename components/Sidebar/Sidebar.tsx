import { getMyTeams } from "@/lib/helper/team.helper";
import SidebarHeader from "./SidebarHeader";
import SidebarTeamLink from "./SidebarTeamLink";
import JoinTeamSidebarLink from "./JoinTeamSidebarLink";

const Sidebar = async () => {
  const teams = await getMyTeams();

  return (
    <div className="h-screen w-16 lg:w-32 bg-main hidden md:flex flex-col">
      <div className="h-32 w-full shrink-0">
        <SidebarHeader />
      </div>
      <div className="flex flex-1 flex-col scrollbar-hidden overflow-y-scroll items-center gap-4 lg:gap-6 py-4 lg:pt-6">
        {teams &&
          teams.map((team) => <SidebarTeamLink key={team.id} team={team} />)}
      </div>
      <div className="h-24 shrink-0 w-full flex items-center justify-center">
        <JoinTeamSidebarLink />
      </div>
    </div>
  );
};
export default Sidebar;
