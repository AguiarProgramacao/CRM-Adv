export default function Button({ children, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-blue-600 text-white items-center py-2 px-4 rounded hover:bg-blue-700 flex"
    >
      {children}
    </button>
  );
}
