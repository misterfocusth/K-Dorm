import { BuildingDashboardView } from "@/components/pages/staff/building/view/BuildingDashboard"
import StaffLayout from "../layout"
import { StaffContainer } from "@/components/pages/staff/container"

const BuildingDashboardPage = () => {
    return (
        <StaffContainer>
            <BuildingDashboardView />
        </StaffContainer>
    )
}

export default BuildingDashboardPage