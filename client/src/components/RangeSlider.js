import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";

const useStyles = makeStyles({
  root: {
    width: 250
  },
  input: {
    width: 60
  }
});

const DEFAULT_VALUE = 1000;
const MIN_VALUE = 0;
const MAX_VALUE = 1000;
const STEP = 10;

export default function InputSlider(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(DEFAULT_VALUE);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    props.setRadius(newValue);
  };

  const handleInputChange = event => {
    let value = event.target.value === "" ? "" : Number(event.target.value);
    if (value < MIN_VALUE) {
      setValue(MIN_VALUE);
      props.setRadius(MIN_VALUE);
    } else if (value > MAX_VALUE) {
      setValue(MAX_VALUE);
      props.setRadius(MAX_VALUE);
    } else {
      setValue(value);
      props.setRadius(value);
    }
  };

  const handleBlur = () => {
    if (value < MIN_VALUE) {
      setValue(MIN_VALUE);
    } else if (value > MAX_VALUE) {
      setValue(MAX_VALUE);
    }
  };

  return (
    <div className={classes.root}>
      <Typography id="input-slider" gutterBottom>
        Radius (meters)
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof value === "number" ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            min={MIN_VALUE}
            max={MAX_VALUE}
            step={STEP}
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={value}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: STEP,
              min: MIN_VALUE,
              max: MAX_VALUE,
              type: "number",
              "aria-labelledby": "input-slider"
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}
