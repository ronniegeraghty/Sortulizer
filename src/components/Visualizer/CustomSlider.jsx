import { withStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";

const sizer = 3;
function calcLabelLeft(x) {
  return (
    -((257 * x * x * x * x) / 420) +
    (72 * x * x * x) / 5 -
    (51217 * x * x) / 420 +
    (4629 * x) / 10 -
    4854 / 7
  );
}

const styles = {
  root: {
    color: "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
    height: 2 * sizer,
    width: "30vw",
  },
  thumb: {
    height: 6 * sizer,
    width: 6 * sizer,
    backgroundColor: "#fff",
    border: "2px solid #89E6D3",
    marginTop: -2 * sizer,
    marginLeft: -3 * sizer,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: calcLabelLeft(sizer) + "%",
    color: "#89E6D3",
  },
  track: {
    height: 2 * sizer,
    borderRadius: sizer,
    backgroundImage: "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
  },
  rail: {
    height: 2 * sizer,
    borderRadius: sizer,
    backgroundImage: "linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)",
  },
};

export default withStyles(styles)(Slider);
//-7 * (16 / sizer) + "%",
