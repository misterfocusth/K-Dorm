import { StaffContainer } from "@/components/pages/staff/container"
import { RoomsListView } from "@/components/pages/staff/room/view/RoomsListView"
import { getApiService } from "@/libs/tsr-react-query"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const RoomsDashboard = async ({ params: { building_id } }: { params: { building_id: string } }) => {
    return (
        <StaffContainer>
            <RoomsListView building_id={building_id} />
        </StaffContainer>
    )
}

export default RoomsDashboard