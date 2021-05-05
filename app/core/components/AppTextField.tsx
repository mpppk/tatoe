import { TextField, TextFieldProps } from "mui-rff"
import React from "react"

export const AppTextField: React.FC<TextFieldProps> = (props) => {
  return <TextField margin={"dense"} variant={"outlined"} {...props} />
}
