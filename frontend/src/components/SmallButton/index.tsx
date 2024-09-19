interface SmallButtonProps {
  text: string;
  onClick: () => void;
}

export default function SmallButton({ text, onClick }: SmallButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="bg-main py-3.5 px-4 text-center rounded-xl text-white whitespace-nowrap text-sm"
    >
      {text}
    </button>
  );
}
