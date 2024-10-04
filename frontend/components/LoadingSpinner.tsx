type LoadingSpinnerProps = {
  loading: boolean;
};
function LoadingSpinner(props: LoadingSpinnerProps) {
  const { loading } = props;

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 z-50 flex justify-center items-center">
      <div className="border-t-4 border-b-4 border-white rounded-full w-16 h-16 animate-spin"></div>
    </div>
  );
}

export default LoadingSpinner;
