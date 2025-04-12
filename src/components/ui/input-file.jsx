import { Input } from "./input";
import placeholder from "@/assets/icon/foto-icon.svg";

function FileInput({
  onChange,
  id,
  disabled,
  description = "Tambahkan file di sini",
}) {
  return (
    <div
      className={`relative h-14 rounded-lg border border-input flex items-center justify-center
      `}
    >
      <div className="absolute">
        <div className="flex gap-2 items-center">
          <img src={placeholder} className="w-8 h-8" />
          <span className="block text-gray-400 font-normal">{description}</span>
        </div>
      </div>
      <Input
        id={id}
        type="file"
        disabled={disabled}
        onChange={onChange}
        className="h-full w-full opacity-0 disabled:opacity-0"
      />
    </div>
  );
}

export default FileInput;
