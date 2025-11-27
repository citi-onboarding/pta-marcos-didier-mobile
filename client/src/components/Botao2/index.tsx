interface Botao2Props {
  text: string;
  color: string;
  width: string;
  height: string;
  image_src?: string;
  onClick?: () => void;
}

export default function Botao2({
  text,
  color,
  width,
  height,
  image_src,
  onClick,
}: Botao2Props) {
  return (
    <button
      style={{ backgroundColor: color, width: width, height: height }}
      className={`flex items-center justify-center gap-[10px] rounded-[24px] text-white hover:brightness-90 transition-all`}
      onClick={onClick}
    >
      {image_src && (
        <img src={image_src} alt="icon" className="w-[20px] h-[20px]" />
      )}
      <span className="text-[16px]">{text}</span>
    </button>
  );
}
