// 'use client'

// import { useRouter } from 'next/navigation';
// import { useState } from 'react';
// import axios from 'axios';
// import { ClipLoader } from 'react-spinners';
// import Link from 'next/link';

// export default function DeleteAccount() {
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const router = useRouter();

//   const handleDeleteAccount = async () => {
//     const confirmed = window.confirm("Are you sure you want to delete your account? This action cannot be undone.");
//     if (confirmed) {
//       setLoading(true);
//       try {
//         const response = await axios.delete('/api/deleteuser');
//         if (response.status === 200) {
//           alert('Account deleted successfully.');
//           router.push('/');
//         }
//       } catch (error) {
//         setErrorMessage('Failed to delete account.');
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
//         <h1 className="text-2xl font-bold text-gray-800 mb-4">Delete Account</h1>
//         {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
//         <p className="text-gray-700 mb-6">
//           Are you sure you want to delete your account? This action cannot be undone.
//         </p>
//         <div className="flex space-x-4">
//           <button
//             className="bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-700"
//             onClick={handleDeleteAccount}
//             disabled={loading}
//           >
//             {loading ? <ClipLoader color="#ffffff" size={20} /> : 'Delete Account'}
//           </button>
//           <Link href="/">
//             <div className="bg-gray-300 text-gray-700 py-2 px-4 rounded-full hover:bg-gray-400">
//               Cancel
//             </div>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
