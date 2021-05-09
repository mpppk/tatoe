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
  errorText?: string
  onClickDeleteButton: () => void
}

interface DeleteButtonProps {
  onClickDeleteButton: () => void
  disabled?: boolean
}

const DeleteButton = (props: DeleteButtonProps) => {
  const classes = useStyles()
  return (
    <IconButton disabled={props.disabled} onClick={props.onClickDeleteButton}>
      <DeleteIcon className={classes.deleteItemIcon} />
    </IconButton>
  )
}

const RankTextField: React.FC<RankTextFieldProps> = (props) => {
  const classes = useStyles()
  return (
    <div key={"RankTextField" + props.rank} className={classes.rankTextFieldWrapper}>
      <AppTextField
        error={props.errorText !== undefined}
        helperText={props.errorText}
        name={props.name}
        label={`${props.rank}位`}
        fullWidth
      />
      <DeleteButton disabled={props.rank === 1} onClickDeleteButton={props.onClickDeleteButton} />
    </div>
  )
}

export function RankingForm<S extends z.ZodObject<{ items: any }, any>>(props: FormProps<S>) {
  const classes = useStyles()
  return (
    <FinalForm
      initialValues={props.initialValues}
      validate={(values) => {
        if (!props.schema) return
        try {
          props.schema.parse(values)
        } catch (error) {
          return error.formErrors.fieldErrors
        }
      }}
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
            <FieldArray
              name="items"
              validate={(values) => {
                if (!props.schema) return
                const schema = props.schema.shape.items
                try {
                  schema.parse(values)
                } catch (error) {
                  console.log(error)
                  return error.formErrors.fieldErrors
                }
              }}
            >
              {({ fields, meta }) => {
                const handleMoreRankButton = () => push("items", undefined)
                return (
                  <>
                    {fields.map((name, index) => (
                      <RankTextField
                        key={name + index}
                        name={`${name}.name`}
                        onClickDeleteButton={() => fields.remove(index)}
                        rank={index + 1}
                        errorText={meta.error?.[index]}
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
