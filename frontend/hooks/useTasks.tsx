// React
import { useEffect } from "react";

// TS-Rest Query
import { api } from "@/libs/tsr-react-query";

export const useTasks = () => {
  const { data, isLoading, error, isError } = api.task.getTasks.useQuery({
    queryKey: ["tasks"],
  });

  useEffect(() => {
    const test = async () => {
      await api.task.createTask.mutate({
        body: {
          title: "New Task",
          description: "This task has been added when you click test api button",
          complete: false,
        },
      });
    };

    test();
  }, []);

  return {
    tasks: data?.body,
    isLoading,
    error: isError ? (error as any).error : undefined,
  };
};
