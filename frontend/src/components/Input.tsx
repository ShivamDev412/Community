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
export const InputField: FC<
  InputProps & TextFieldProps & { getValues?: Function }
> = ({ register, errors, label, id, disabled = false, getValues, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  const [focused, setFocused] = useState(false);
  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);
  return (
    <FormControl className="w-full">
      {rest.type === "text" ? (
        <>
          <TextField
            color="primary"
            {...register(id)}
            className="w-full"
            label={label}
            disabled={disabled}
            InputLabelProps={{
              shrink: focused || (!!getValues && !!getValues(id)),
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            variant="outlined"
            {...rest}
          />
        </>
      ) : (
        <div className="relative">
          <InputLabel htmlFor={id}>{label ? label : "Password"}</InputLabel>
          <OutlinedInput
            id={id}
            className="w-full"
            {...register(id)}
            color="primary"
            label={label ? label : "Password"}
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
  getValues,
  disabled = false,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);
  const handleFocus = () => setFocused(true);
  const handleBlur = () => setFocused(false);
  return (
    <FormControl className="w-full">
      <TextField
        color="primary"
        {...register(id)}
        className="w-full"
        multiline
        InputLabelProps={{
          shrink: focused || (!!getValues && !!getValues(id)),
        }}
        rows={10}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
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
  }, [getValues, id]);

  return (
    <FormControl className="w-full">
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        labelId={id}
        id={id}
        color="primary"
        className="w-full"
        label={label}
        value={value || ""}
        {...register(id)}
        onChange={(e: SelectChangeEvent) => {
          const selectedValue = e.target.value;
          setValue(selectedValue);
          onChange && onChange(selectedValue);
        }}
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
    dayjs(moment().utc().format("YYYY-MM-DD"))
  );
  const dat = getValues(id);
  useEffect(() => {
    if (dat) {
      setDate(dayjs(moment(dat).utc().format("YYYY-MM-DD")));
      setValue(id, moment(dat).utc().format("YYYY-MM-DD"));
    } else {
      setValue(id, moment().utc().format("YYYY-MM-DD"));
    }
  }, [dat]);
  const onChange = (date: Dayjs | null) => {
    if (date && date.isValid()) {
      const dateOnlyString = date.format("YYYY-MM-DD");
      setValue(id, dateOnlyString);
      setDate(dayjs(date.format()));
      setError(id, undefined);
    } 
    else if (date === null) {
      setError(id, { message: "Event Date is required", manually: true });
    } else {
      setError(id, { message: "Invalid Date", manually: true });
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
  getValues,
}) => {
  const [timeVal, setTime] = useState<Dayjs | null>(null);

  useEffect(() => {
    const val = getValues(id);
    if (val) {
      setTime(dayjs(val, "HH:mm"));
    } else {
      const timeString = dayjs().format("HH:mm");
      setValue(id, timeString);
      setTime(dayjs());
    }
  }, [getValues, id]);

  const onChange = (newTime: Dayjs | null) => {
    if (newTime && newTime.isValid()) {
      const timeString = newTime.format("HH:mm");
      setValue(id, timeString);
      setError(id, undefined);
    } 
    else if (newTime === null) {
      setError(id, {
        message:
          id === "time"
            ? "Event Time is required"
            : "Event end time is required",
        manually: true,
      });
    } else {
      setError(id, { message: "Invalid Time", manually: true });
    }
  };

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          className="w-full"
          {...register(id)}
          label={label}
          value={timeVal}
          onChange={(newTime) => {
            onChange(newTime);
            setTime(newTime);
          }}
        />
      </LocalizationProvider>

      {errors[id] && <p className="text-red-700 my-2">{errors[id].message}</p>}
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
  getValues,
  setError,
  ...rest
}) => {
  const [selectedData, setSelectedData] = useState<Array<string>>([]);
  useEffect(() => {
    const val = getValues(id);
    if (val) {
      setSelectedData(val);
    }
  }, [getValues, id]);
  return (
    <FormControl className="w-full">
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        labelId={id}
        id={id}
        multiple
        color="primary"
        defaultValue={defaultValue}
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
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: "80%",
              overflowY: "auto",
            },
          },
        }}
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
