import StudentMaintenanceDetailPage from "@/components/pages/student/maintenance/StudentMaintenanceDetailPage";

const Page = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  return <StudentMaintenanceDetailPage id={id} />;
};

export default Page;
