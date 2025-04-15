export default function Loading() {
  return (
    <div className="p-4">
      <div className="h-8 w-64 bg-gray-100 rounded mb-4 animate-pulse"></div>
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="border p-4 rounded-md">
            <div className="h-6 w-3/4 bg-gray-100 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-full bg-gray-100 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-5/6 bg-gray-100 rounded animate-pulse mb-2"></div>
            <div className="h-4 w-24 bg-gray-100 rounded animate-pulse mt-2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
