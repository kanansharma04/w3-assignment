export default function ClaimButton({ onClick, disabled }) {
  return (
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded w-full sm:w-auto"
      onClick={onClick}
      disabled={disabled}
    >
      Claim
    </button>
  );
}
