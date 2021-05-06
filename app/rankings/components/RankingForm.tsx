import { FormProps } from "app/core/components/Form"
import * as z from "zod"
import React from "react"
import { Button, IconButton, makeStyles } from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import { Form as FinalForm } from "react-final-form"
import { AppTextField } from "../../core/components/AppTextField"
import arrayMutators from "final-form-arrays"
import { FieldArray } from "react-final-form-arrays"

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
  name: string
  rank: number
  onClickDeleteButton: () => void
}

const RankTextField: React.FC<RankTextFieldProps> = (props) => {
  const classes = useStyles()
  return (
    <div key={"RankTextField" + props.rank} className={classes.rankTextFieldWrapper}>
      <AppTextField name={props.name} label={`${props.rank}位`} fullWidth />
      <IconButton onClick={props.onClickDeleteButton}>
        <DeleteIcon className={classes.deleteItemIcon} />
      </IconButton>
    </div>
  )
}

export function RankingForm<S extends z.ZodType<any, any>>(props: FormProps<S>) {
  const classes = useStyles()
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
      mutators={{ ...arrayMutators }}
      onSubmit={props.onSubmit}
      render={({
        handleSubmit,
        submitting,
        submitError,
        form: {
          mutators: { push, pop },
        },
      }) => {
        return (
          <form {...props} onSubmit={handleSubmit} className="form">
            {submitError && (
              <div role="alert" style={{ color: "red" }}>
                {submitError}
              </div>
            )}

            <AppTextField name="title" label={"タイトル"} fullWidth />
            <AppTextField name="description" label={"説明"} fullWidth />
            <FieldArray name="items">
              {({ fields }) => {
                const handleMoreRankButton = () => push("items", undefined)
                return (
                  <>
                    {fields.map((name, index) => (
                      <RankTextField
                        name={`${name}.name`}
                        onClickDeleteButton={() => fields.remove(index)}
                        rank={index + 1}
                      />
                    ))}
                    <div className={classes.buttonWrapper}>
                      <Button
                        className={classes.moreRankButton}
                        variant={"outlined"}
                        onClick={handleMoreRankButton}
                      >
                        {(fields.length ?? 0) + 1 + "位を追加"}
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
                  </>
                )
              }}
            </FieldArray>
          </form>
        )
      }}
    />
  )
}
