import ReactSlider from "react-slider";

interface SliderProps {
  label: string;
  name: string;
  onValueChange: (value: number) => void;
  defaultValue?: number;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
}

const Slider: React.FC<SliderProps> = ({
  label,
  name,
  onValueChange,
  defaultValue = 1,
  value,
  min = 1,
  max = 10,
  step = 1,
}) => {
  const isControlled = value !== undefined;
  return (
    <div className="w-full">
      <label htmlFor={name}>{label}</label>
      <ReactSlider
        className="flex items-center bg-gray-200 h-4 rounded-full px-4 mt-2"
        onChange={(val) => onValueChange(typeof val === "number" ? val : val[0])}
        {...(isControlled ? { value } : { defaultValue })}
        min={min}
        max={max}
        step={step}
        ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
        // Marker
        renderThumb={(props, state) => (
          <div
            {...props}
            className="h-8 w-8 flex cursor-pointer justify-center items-center bg-purple-600 rounded-full focus:outline-none"
          >
            {state.valueNow}
          </div>
        )}
        renderTrack={(props, state) => (
          <div
            {...props}
            className={`h-4 rounded-full ${
              state.index === 0 ? "bg-purple-500" : "bg-gray-300"
            }`}
          ></div>
        )}
        pearling
      />
    </div>
  );
};

export default Slider;
