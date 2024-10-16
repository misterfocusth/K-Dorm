'use client'

import { Button } from "@/components/ui/button"
import { RoomsTable } from "../components/RoomsTable"
import { getApiService } from "@/libs/tsr-react-query"
import { useMemo } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { match } from "ts-pattern"
import { TableEmpty, TableLoading } from "@/components/ui/table"
import { useRenderModal } from "@/providers/ModalProvider"
import { CreateRoomsModal } from "../components/CreateRoomModal"
import { useRoomsByBuilding } from "../hooks/useRoomsByBuilding"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

interface Props {
    building_id: string
}

export const RoomsListView: React.FC<Props> = ({ building_id }) => {


    const { data } = useRoomsByBuilding(building_id)
    const { open } = useRenderModal(<CreateRoomsModal building_id={building_id} />)

    return (
        <div className="flex flex-col gap-y-8 h-full">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/staff/building">ตึกทั้งหมด</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href={`/staff/building/${building_id}`}>ตึก {data?.name ?? "-"}</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex w-full">
                <div className="flex flex-col w-full">
                    <h1 className="text-3xl font-medium flex gap-x-2">
                        ห้องทั้งหมดในตึก {data?.name ?? <Skeleton className="h-9 w-20" />}
                    </h1>
                    <span className="">
                        ทั้งหมด {data?.rooms.length ?? "-"} ห้อง
                    </span>
                </div>
                <div className="flex items-end justify-end pl-auto">
                    <Button onClick={open} >
                        เพิ่มห้องใหม่
                    </Button>
                </div>
            </div>
            <div className="flex-grow mt-2">
                {
                    match({
                        isEmpty: data?.rooms.length === 0,
                        isPending: !data
                    }).with({
                        isEmpty: true
                    }, () => <TableEmpty />)
                        .with({
                            isPending: true
                        }, () => <TableLoading />)
                        .otherwise(() => <>
                            <RoomsTable building_id={building_id} rooms={data!.rooms} />
                        </>)
                }
            </div>
        </div>
    )
}