import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50 transition-opacity duration-300 ease-out p-4 dark:bg-gray-900 dark:bg-opacity-75"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-lg mx-auto relative transform transition-all duration-300 ease-out scale-95 opacity-0 data-[state=open]:scale-100 data-[state=open]:opacity-100"
        onClick={(e) => e.stopPropagation()}
        data-state={isOpen ? "open" : "closed"}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl font-semibold transition-colors duration-200"
          aria-label="Close modal"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
// import React from "react";
// import { FaTimes } from "react-icons/fa";

// interface CommentModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (comment: string) => void;
// }

// const CommentModal: React.FC<CommentModalProps> = ({ isOpen, onClose, onSubmit }) => {
//   const [comment, setComment] = React.useState("");

//   if (!isOpen) return null;

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (comment.trim()) {
//       onSubmit(comment.trim());
//       setComment("");
//       onClose();
//     }
//   };

//   return (
//     <div
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
//       onClick={onClose}
//     >
//       <div
//         className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md relative"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between border-b border-gray-300 dark:border-gray-600 pb-3 mb-4">
//           <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
//             Add Comment
//           </h3>
//           <button
//             className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
//             onClick={onClose}
//             aria-label="Close modal"
//           >
//             <FaTimes className="w-5 h-5" />
//           </button>
//         </div>

//         {/* Body */}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label
//               htmlFor="comment"
//               className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200"
//             >
//               Your Comment
//             </label>
//             <textarea
//               id="comment"
//               value={comment}
//               onChange={(e) => setComment(e.target.value)}
//               rows={4}
//               className="w-full p-2.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 resize-none"
//               placeholder="Write your comment here..."
//               required
//             />
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             className="w-full inline-flex items-center justify-center px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium rounded-lg focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//           >
//             Submit Comment
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CommentModal;
