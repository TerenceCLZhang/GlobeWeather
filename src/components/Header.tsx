import { useDispatch, useSelector } from "react-redux";
import { changeUnit } from "../state/UnitSlice";
import type { RootState } from "../state/store";

function Header() {
  const unit = useSelector((state: RootState) => state.unit.unit);
  const dispatch = useDispatch();

  return (
    <header>
      <a href="/" className="absolute top-10 left-5 md:left-10">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Globe<span className="text-orange-600">Weather</span>
        </h1>
      </a>
      <button
        type="button"
        className="absolute top-10 right-5 md:right-10 button-orange"
        onClick={() => dispatch(changeUnit())}
        aria-label={`Switch to ${
          unit === "metric" ? "imperial" : "metric"
        } units`}
      >
        <b>{unit === "metric" ? "Imperial" : "Metric"}</b>
      </button>
    </header>
  );
}

export default Header;
