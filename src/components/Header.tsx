import { useDispatch, useSelector } from "react-redux";
import { changeUnit } from "../store/UnitSlice";
import type { RootState } from "../store/store";

function Header() {
  const unit = useSelector((state: RootState) => state.unit);
  const dispatch = useDispatch();

  return (
    <header>
      <a href="/" className="absolute top-10 left-10 ">
        <h1 className="text-3xl font-bold">Weather App</h1>
      </a>
      <button
        className="absolute top-10 right-10 button-orange"
        onClick={() => dispatch(changeUnit())}
      >
        Switch to{" "}
        <b>{unit.measurement === "metric" ? "Fahrenheit" : "Metric"}</b>
      </button>
    </header>
  );
}

export default Header;
