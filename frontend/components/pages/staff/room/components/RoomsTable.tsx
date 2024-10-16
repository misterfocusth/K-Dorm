import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { roomSchema } from "@/schemas/room"
import React from "react"
import { RawCreateParams, z } from "zod"
import { match } from "ts-pattern"
import { CheckIcon, CircleIcon, DeleteIcon, DotIcon, EditIcon, PersonStanding } from "lucide-react"
import { useRenderModal } from "@/providers/ModalProvider"
import { MutateRoomModal } from "./EditRoomModal"
import { useDeleteRoom } from "../hooks/useDeleteRoom"
import { toast } from "sonner"


export interface RoomsTableProps {
    building_id: string
    rooms: {
        id: string,
        name: string,
        floor: string,
        is_occupied: boolean
    }[]
}

export const RoomsTable: React.FC<RoomsTableProps> = ({ rooms, building_id }) => {

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
                                <Row key={room.id} building_id={building_id} {...room} />
                            )
                        }
                    )
                }
            </TableBody>
        </Table>
    )
}

const Row = ({ building_id, ...room }: {
    building_id: string,
    id: string,
    name: string,
    floor: string,
    is_occupied: boolean
}) => {

    const { open } = useRenderModal(<MutateRoomModal {...room} room_id={room.id} building_id={building_id} />
    )
    const { deleteRoom } = useDeleteRoom()
    const handleDelete = async () => {
        const result = await deleteRoom(room.id)
        if (result) {
            toast.success("ลบห้องสำเร็จ")
        } else {
            toast.error("ลบห้องไม่สำเร็จ")
        }
    }

    return (
        <TableRow key={room.id}>
            <TableCell>
                {room.name}
            </TableCell>
            <TableCell>
                {room.floor}
            </TableCell>
            <TableCell>
                {!room.is_occupied ?
                    <CheckIcon className="text-green-500 size-6" />
                    : <PersonStanding className="text-red-500 size-6" />}
            </TableCell>
            <TableCell className="flex gap-x-4 justify-end items-center">
                <EditIcon className="cursor-pointer" onClick={open} />
                <DeleteIcon className="cursor-pointer" onClick={handleDelete} />
            </TableCell>
        </TableRow>
    )
}