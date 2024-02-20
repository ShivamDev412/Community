import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
  OutlinedInput,
  InputLabel,
} from "@mui/material";
import { UseFormRegister } from "react-hook-form";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { FC, useState } from "react";

interface InputProps {
  register: UseFormRegister<any>;
  errors: any;
  id: string;
}

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
    <div className="w-full">
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
    </div>
  );
};
