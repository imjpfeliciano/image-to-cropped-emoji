import ReactSlider from "react-slider";

interface SliderProps {
  label: string;
  name: string;
  onValueChange: (value: number) => void;
  defaultValue?: number;
}

const Slider: React.FC<SliderProps> = ({
  label,
  name,
  onValueChange,
  defaultValue = 1,
}) => {
  return (
    <div className="w-full">
      <label htmlFor={name}>{label}</label>
      <ReactSlider
        className="flex items-center bg-gray-200 h-4 rounded-full px-4 mt-2"
        onChange={(value) => onValueChange(value)}
        // Track of the slider
        defaultValue={defaultValue}
        min={1}
        max={10}
        ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
        // Marker
        renderThumb={(props, state) => (
          <div
            {...props}
            className="h-8 w-8 flex justify-center items-center bg-purple-600 rounded-full focus:outline-none"
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
