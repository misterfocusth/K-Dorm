type StudentHeaderProps = {
  title?: string;
  children?: React.ReactNode;
};

const StudentHeader = ({ title, children }: StudentHeaderProps) => {
  if (children) {
    return <div className="p-6 w-full shadow-lg">{children}</div>;
  }
  return (
    // TODO: Implement Navbar without children provided.
    <div>StudentHeader</div>
  );
};

export default StudentHeader;
