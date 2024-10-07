type StudentMaintenanceDetailPageProps = {
  id: string;
};

const StudentMaintenanceDetailPage = ({ id }: StudentMaintenanceDetailPageProps) => {
  return <div className="px-6">{id}</div>;
};

export default StudentMaintenanceDetailPage;
