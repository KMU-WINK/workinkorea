interface SmallButtonProps {
  text: string;
  onClick: () => void;
  isAllowed?: boolean;
}

export default function SmallButton({
  text,
  onClick,
  isAllowed = true,
}: SmallButtonProps) {
  return (
    <button
      disabled={!isAllowed}
      type="button"
      onClick={onClick}
      className={`py-3.5 px-4 text-center rounded-xl text-white whitespace-nowrap text-sm ${isAllowed ? 'bg-main' : 'bg-unavailable cursor-default'}`}
    >
      {text}
    </button>
  );
}
