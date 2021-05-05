import { FormProps } from "app/core/components/Form"
import * as z from "zod"
import React, { useState } from "react"
import { Button, makeStyles } from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import { Form as FinalForm } from "react-final-form"
import { AppTextField } from "../../core/components/AppTextField"

export { FORM_ERROR } from "app/core/components/Form"

const useStyles = makeStyles((theme) => ({
  buttonWrapper: {
    marginTop: theme.spacing(1),
  },
  moreRankButton: {
    // marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  rankTextFieldWrapper: {
    display: "flex",
    alignItems: "center",
  },
  deleteItemIcon: {
    marginLeft: theme.spacing(1),
  },
}))

interface RankTextFieldProps {
  rank: number
}

const RankTextField: React.FC<RankTextFieldProps> = (props) => {
  const classes = useStyles()
  return (
    <div key={"RankTextField" + props.rank} className={classes.rankTextFieldWrapper}>
      <AppTextField name={`items.${props.rank - 1}.name`} label={`${props.rank}位`} fullWidth />
      <DeleteIcon className={classes.deleteItemIcon} />
    </div>
  )
}

export function RankingForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  const classes = useStyles()
  const [maxRank, setMaxRank] = useState(3)
  const seq = Array.from({ length: maxRank }, (v, k) => k)
  const handleMoreRankButton = setMaxRank.bind(null, maxRank + 1)

  return (
    <FinalForm
      initialValues={props.initialValues}
      // validate={(values) => {
      //   if (!schema) return
      //   try {
      //     schema.parse(values)
      //   } catch (error) {
      //     return error.formErrors.fieldErrors
      //   }
      // }}
      onSubmit={props.onSubmit}
      render={({ handleSubmit, submitting, submitError }) => (
        <form {...props} onSubmit={handleSubmit} className="form">
          {submitError && (
            <div role="alert" style={{ color: "red" }}>
              {submitError}
            </div>
          )}

          <AppTextField name="title" label={"タイトル"} fullWidth />
          <AppTextField name="description" label={"説明"} fullWidth />
          {seq.map((s) => (
            <RankTextField rank={s + 1} />
          ))}

          <div className={classes.buttonWrapper}>
            <Button
              className={classes.moreRankButton}
              variant={"outlined"}
              onClick={handleMoreRankButton}
            >
              {maxRank + 1 + "位を追加"}
            </Button>

            {props.submitText && (
              <Button
                type="submit"
                disabled={submitting}
                className="submit-button"
                variant={"contained"}
                color={"primary"}
              >
                {props.submitText}
              </Button>
            )}
          </div>
        </form>
      )}
    />
  )
}
