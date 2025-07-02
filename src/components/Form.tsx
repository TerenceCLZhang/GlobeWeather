import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";
import { clearWeatherData } from "../state/WeatherDataSlice";

const schema = z.object({
  location: z.string().min(1),
});

type Inputs = z.infer<typeof schema>;

interface Props {
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
}

function Form({ location, setLocation }: Props) {
  const { register, handleSubmit } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const dispatch = useDispatch();

  const onSubmit = (data: Inputs) => {
    const newLocation = data.location.toLowerCase();
    if (location === newLocation) return;
    dispatch(clearWeatherData());
    setLocation(newLocation);
  };

  return (
    <form
      action="#"
      className="black-background justify-between"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        type="text"
        placeholder="Enter a location"
        className="placeholder:text-gray-300 text-white focus:outline-0 w-full mr-5 px-5"
        {...register("location")}
      />
      <input type="submit" value="Search" className="button-orange" />
    </form>
  );
}

export default Form;
