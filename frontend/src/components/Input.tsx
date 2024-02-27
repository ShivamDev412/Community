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
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { FC, useState } from "react";
import { InputProps, SelectFieldProps } from "@/Types";

export const InputField: FC<InputProps & TextFieldProps> = ({
  register,
  errors,
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
        />
      ) : (
        <div className="relative">
          <InputLabel htmlFor={id}>Password</InputLabel>
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
            label="Password"
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
export const SelectField: FC<SelectFieldProps> = ({
  register,
  id,
  errors,
  options,
  label,
  defaultValue,
  ...rest
}) => {
  return (
    <FormControl className="w-full">
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        labelId={id}
        id={id}
        color="primary"
        className="w-full"
        label={label}
        defaultValue={defaultValue}
        {...register(id)}
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
