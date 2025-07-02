import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { WeatherDataInterface } from "../types/WeatherDataInterface";

const schema = z.object({
  location: z.string().min(1),
});

type Inputs = z.infer<typeof schema>;

interface Props {
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  setWeatherData: React.Dispatch<
    React.SetStateAction<WeatherDataInterface | undefined>
  >;
}

function Form({ setLocation, setWeatherData }: Props) {
  const { register, handleSubmit } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: Inputs) => {
    const location = data.location.toLowerCase();
    setWeatherData(undefined);
    setLocation(location);
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
        className="placeholder:text-white text-white focus:outline-0 w-full mr-5 px-5"
        {...register("location")}
      />
      <input type="submit" value="Search" className="button-orange" />
    </form>
  );
}

export default Form;
