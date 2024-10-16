import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { roomSchema } from "@/schemas/room"
import React from "react"
import { RawCreateParams, z } from "zod"
import { useRoomsByBuilding } from "../hooks/useRoomsByBuilding"
import { NextPage } from "next"
import { match } from "ts-pattern"
import { CheckIcon, DotIcon } from "lucide-react"

type Room = z.infer<typeof roomSchema>

export interface RoomsTableProps {
    rooms: {
        id: string,
        name: string,
        floor: string,
        is_occupied: boolean
    }[]
}

export const RoomsTable: React.FC<RoomsTableProps> = ({ rooms }) => {




    return (
        <Table>
            <TableHeader>
                <TableHead>
                    ชื่อห้อง
                </TableHead>
                <TableHead>
                    ชั้น
                </TableHead>
                <TableHead>
                    ห้องว่าง
                </TableHead>
                <TableHead className="w-[200px]">

                </TableHead>
            </TableHeader>
            <TableBody>
                {
                    rooms.map(
                        (room) => {
                            return (
                                <TableRow>
                                    <TableCell>
                                        {room.name}
                                    </TableCell>
                                    <TableCell>
                                        {room.floor}
                                    </TableCell>
                                    <TableCell>
                                        {!room.is_occupied ?
                                            <DotIcon className="bg-green-500" />
                                            : <DotIcon className="bg-red-500" />}
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    )
                }
            </TableBody>
        </Table>
    )
}