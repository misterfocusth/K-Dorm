import { getApiService } from "@/libs/tsr-react-query"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"

export const useBuildingsQuery = () => {
    const query = getApiService().building.getAll.useQuery({
        queryKey: ["buildings"]
    })


    const buildings = useMemo(() => {
        if (query.data?.status === 200) {
            return query.data.body.result
        } else {
            return undefined
        }
    }, [query.data?.body.result])


    return { query, data: buildings }
}