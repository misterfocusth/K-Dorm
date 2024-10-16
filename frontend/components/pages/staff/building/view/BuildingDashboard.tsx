'use client'

import { BuildingDashboardTable } from "../components/BuildingDashboardTable"
import { useBuildingsQuery } from "../hooks/useBuildingsQuery"

export const BuildingDashboardView = () => {

    const { data: buildings } = useBuildingsQuery()

    return (
        <div className="flex flex-col gap-y-2 h-full">
            <h1 className="text-3xl font-medium">
                จัดการตึก
            </h1>
            <span className="">
                จัดการตึกและห้องพักทั้งหมดจากในหน้านี้
            </span>
            <div className="flex-grow mt-2">
                <BuildingDashboardTable buildings={buildings} />
            </div>
        </div>
    )
}