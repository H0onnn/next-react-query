export default function Loading() {
  return (
    <div className="p-4">
      <div className="h-8 w-64 bg-gray-100 rounded mb-4 animate-pulse"></div>
      <div className="space-y-4">
        <div className="h-4 w-full bg-gray-100 rounded animate-pulse"></div>
        <div className="h-4 w-full bg-gray-100 rounded animate-pulse"></div>
        <div className="h-4 w-3/4 bg-gray-100 rounded animate-pulse"></div>
      </div>
    </div>
  );
}
