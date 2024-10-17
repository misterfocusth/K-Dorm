import { StaffContainer } from "@/components/pages/staff/container"
import { useRecruitmentWaves } from "@/components/pages/staff/recruitment-wave/hooks/useRecruitmentWaves"
import { RecruitmentWaveDashboard } from "@/components/pages/staff/recruitment-wave/view/recruitment-wave-dashboard"

const ReecruitmentWavePage = () => {
    return (
        <StaffContainer>
            <RecruitmentWaveDashboard />
        </StaffContainer>
    )
}

export default ReecruitmentWavePage