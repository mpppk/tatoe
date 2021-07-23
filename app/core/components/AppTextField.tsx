import { TextField, TextFieldProps } from "mui-rff"
import React from "react"
import { useField } from "react-final-form"

export const AppTextField: React.FC<TextFieldProps> = (props) => {
  const { input, meta } = useField(props.name)
  return (
    <TextField
      InputLabelProps={{ shrink: input.value !== "" || meta.active }}
      margin={"dense"}
      variant={"outlined"}
      {...props}
    />
  )
}
