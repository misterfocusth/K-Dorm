'use client'

import { Button } from "@/components/ui/button"
import { useRoomsByBuilding } from "../hooks/useRoomsByBuilding"
import { buildingContract } from "@/contracts/building"
import { RoomsTable, RoomsTableProps } from "../components/RoomsTable"
import { getApiService } from "@/libs/tsr-react-query"
import { useMemo } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { match } from "ts-pattern"
import { TableEmpty, TableLoading } from "@/components/ui/table"

interface Props {
    building_id: string
}

export const RoomsListView: React.FC<Props> = ({ building_id }) => {

    console.log('building_id :>> ', building_id);

    const query = getApiService().building.getWithRooms.useQuery({
        queryKey: ['building-with-rooms'],
        queryData: {
            params: {
                id: building_id
            }
        }
    })

    const data = useMemo(() => {
        if (query.data?.status !== 200)
            return undefined
        const name = query.data.body.result.name
        const rooms = query.data.body.result.rooms

        return {
            name, rooms
        }
    }, [query.data?.body.result.name, query.data?.body.result.rooms, query.data?.status])



    return (
        <div className="flex flex-col gap-y-2 h-full">
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
                    <Button >
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
                            <RoomsTable rooms={data!.rooms} />
                        </>)
                }
            </div>
        </div>
    )
}