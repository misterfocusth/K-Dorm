'use client'

import { Button } from "@/components/ui/button"
import { BuildingDashboardTable } from "../components/BuildingDashboardTable"
import { useBuildingsQuery } from "../hooks/useBuildingsQuery"
import { useCreateBuildingMutate } from "../hooks/useCreateBuilding"
import { useRenderModal } from "@/providers/ModalProvider"
import { MutateBuildingModal } from "../components/MutateBuildingModal"

export const BuildingDashboardView = () => {

    const { data: buildings } = useBuildingsQuery()
    const { open } = useRenderModal(<MutateBuildingModal />)

    return (
        <div className="flex flex-col gap-y-2 h-full">
            <div className="flex w-full">
                <div className="flex flex-col w-full">
                    <h1 className="text-3xl font-medium">
                        จัดการตึก
                    </h1>
                    <span className="">
                        จัดการตึกและห้องพักทั้งหมดจากในหน้านี้
                    </span>
                </div>
                <div className="flex items-end justify-end pl-auto">
                    <Button onClick={open}>
                        เพิ่มตึกใหม่
                    </Button>
                </div>
            </div>

            <div className="flex-grow mt-2">
                <BuildingDashboardTable buildings={buildings} />
            </div>
        </div>
    )
}