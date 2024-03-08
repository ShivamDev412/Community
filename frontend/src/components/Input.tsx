import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
  OutlinedInput,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
  Checkbox,
  ListItemText,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import moment from "moment";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { FC, useEffect, useState } from "react";
import {
  DateAndTimePickerProps,
  InputProps,
  MultiSelectFieldProps,
  SelectFieldProps,
} from "@/Types";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
export const InputField: FC<InputProps & TextFieldProps> = ({
  register,
  errors,
  label,
  id,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <FormControl className="w-full">
      {rest.type === "text" ? (
        <TextField
          variant="outlined"
          {...rest}
          color="primary"
          {...register(id)}
          className="w-full"
          label={label}
        />
      ) : (
        <div className="relative">
          <InputLabel htmlFor={id}>{label ? label : "Password"}</InputLabel>
          <OutlinedInput
            id={id}
            className="w-full"
            {...register(id)}
            color="primary"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label={label ? label : "Password"} 
          />
        </div>
      )}

      {typeof errors[id] === "string" ? (
        <p className="text-red-700 my-2">{errors[id]}</p>
      ) : (
        errors[id] && <p className="text-red-700 my-2">{errors[id].message}</p>
      )}
    </FormControl>
  );
};
export const DescriptionField: FC<InputProps & TextFieldProps> = ({
  register,
  id,
  errors,
  ...rest
}) => {
  return (
    <FormControl className="w-full">
      <TextField
        color="primary"
        {...register(id)}
        className="w-full"
        multiline
        rows={10}
        {...rest}
      />
      {typeof errors[id] === "string" ? (
        <p className="text-red-700 my-2">{errors[id]}</p>
      ) : (
        errors[id] && <p className="text-red-700 my-2">{errors[id].message}</p>
      )}
    </FormControl>
  );
};
export const SelectField: FC<
  SelectFieldProps & { onChange?: Function; getValues?: any }
> = ({
  register,
  id,
  errors,
  options,
  label,
  defaultValue,
  onChange,
  getValues,
  ...rest
}) => {
  const [value, setValue] = useState(defaultValue);
  useEffect(() => {
    const val = getValues(id);
    setValue(val);
  }, [getValues]);
  return (
    <FormControl className="w-full">
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        labelId={id}
        id={id}
        color="primary"
        className="w-full"
        label={label}
        value={value}
        defaultValue={defaultValue}
        {...register(id, {
          onChange: (e: SelectChangeEvent) => {
            setValue(e.target.value);
            onChange && onChange(e.target.value);
          },
        })}
        {...rest}
      >
        {options.map((option) => (
          <MenuItem value={option.value} key={option.label}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {typeof errors[id] === "string" ? (
        <p className="text-red-700 my-2">{errors[id]}</p>
      ) : (
        errors[id] && <p className="text-red-700 my-2">{errors[id].message}</p>
      )}
    </FormControl>
  );
};
export const DateField: FC<DateAndTimePickerProps> = ({
  register,
  errors,
  id,
  setValue,
  label,
  setError,
  getValues,
}) => {
  const [date, setDate] = useState<Dayjs | null>(
    dayjs(moment().format("YYYY-MM-DD"))
  );
  const dat = getValues(id);
  useEffect(() => {
    if (dat) {
      setDate(dayjs(moment(dat).format("YYYY-MM-DD")));
      setValue(id, moment(dat).format("YYYY-MM-DD"));
    }
  }, [dat]);
  const onChange = (date: Dayjs | null) => {
    if (date) {
      const dateOnlyString = date.format("YYYY-MM-DD");
      setValue(id, dateOnlyString);
      setDate(dayjs(date.format()));
      setError(id, undefined);
    }
  };
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          className="w-full"
          value={date}
          {...register(id)}
          label={label}
          onChange={onChange}
        />
      </LocalizationProvider>

      {typeof errors[id] === "string" ? (
        <p className="text-red-700 my-2">{errors[id]}</p>
      ) : (
        errors[id] && <p className="text-red-700 my-2">{errors[id].message}</p>
      )}
    </div>
  );
};
export const TimeField: FC<DateAndTimePickerProps> = ({
  register,
  errors,
  label,
  id,
  setError,
  setValue,
}) => {
  const [time, setTime] = useState<moment.Moment | null>(moment());
  const onChange = (time: moment.Moment) => {
    if (time) {
      const timeString = time.format("HH:mm");
      setValue(id, timeString);
      setTime(time);
      setError(id, undefined);
    }
  };
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          className="w-full"
          {...register(id, {
            value: time,
          })}
          label={label}
          // @ts-ignore
          onChange={onChange}
        />
      </LocalizationProvider>

      {typeof errors[id] === "string" ? (
        <p className="text-red-700 my-2">{errors[id]}</p>
      ) : (
        errors[id] && <p className="text-red-700 my-2">{errors[id].message}</p>
      )}
    </div>
  );
};
export const MultiSelectField: FC<
  MultiSelectFieldProps & { clearErrors: Function; setError: Function }
> = ({
  register,
  id,
  errors,
  options,
  label,
  defaultValue,
  setValue,
  clearErrors,
  setError,
  ...rest
}) => {
  const [selectedData, setSelectedData] = useState<Array<string>>([]);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  return (
    <FormControl className="w-full">
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        labelId={id}
        id={id}
        multiple
        color="primary"
        className="w-full"
        label={label}
        {...(register("tags"),
        {
          value: selectedData,
          onChange: (e: SelectChangeEvent<string[]>) => {
            if (e.target.value.length !== 0) {
              clearErrors(id);
            }
            if (e.target.value.length === 0) {
              setError(id, {
                type: "required",
                message: "At least one tag is required",
              });
            }
            setValue(
              id,
              typeof e.target.value === "string"
                ? e.target.value.split(",")
                : e.target.value
            );
            setSelectedData(
              typeof e.target.value === "string"
                ? e.target.value.split(",")
                : e.target.value
            );
          },
        })}
        {...rest}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={MenuProps}
      >
        {options.map((value) => (
          <MenuItem key={value.value} value={value.label}>
            <Checkbox checked={selectedData.includes(value.label)} />
            <ListItemText primary={value.label} />
          </MenuItem>
        ))}
      </Select>
      {typeof errors[id] === "string" ? (
        <p className="text-red-700 my-2">{errors[id]}</p>
      ) : (
        errors[id] && <p className="text-red-700 my-2">{errors[id].message}</p>
      )}
    </FormControl>
  );
};
