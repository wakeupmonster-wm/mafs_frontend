// export default function GlobalLoader() {
//   return (
//     <div className="fixed inset-0 z-[9999] bg-white/70 flex items-center justify-center">
//       <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
//     </div>
//   );
// }

// src/components/common/GlobalLoader.jsx
import { useSelector } from 'react-redux';

export default function GlobalLoader() {
  const { isLoading, loadingText } = useSelector((state) => state.loader);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg shadow-lg flex items-center gap-3">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span>{loadingText}</span>
      </div>
    </div>
  );
}