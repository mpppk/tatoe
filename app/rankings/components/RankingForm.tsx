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
  namePrefix: string
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

interface RankFieldsProps extends RankTextFieldProps {
  namePrefix: string
  error: Record<"name" | "description", string>
}

const RankFields: React.FC<RankFieldsProps> = (props) => {
  return (
    <>
      <RankTextField
        namePrefix={props.namePrefix}
        rank={props.rank}
        onClickDeleteButton={props.onClickDeleteButton}
        errorText={props?.error?.name}
      />
      <RankDescriptionTextField
        namePrefix={props.namePrefix}
        rank={props.rank}
        onClickDeleteButton={props.onClickDeleteButton}
        errorText={props?.error?.description}
      />
    </>
  )
}

const RankDescriptionTextField: React.FC<RankTextFieldProps> = (props) => {
  const classes = useStyles()
  return (
    <div className={classes.rankTextFieldWrapper}>
      <AppTextField
        error={props.errorText !== undefined}
        helperText={props.errorText}
        name={props.namePrefix + ".description"}
        label={`${props.rank}位の説明`}
        fullWidth
      />
    </div>
  )
}

const RankTextField: React.FC<RankTextFieldProps> = (props) => {
  const classes = useStyles()
  return (
    <div className={classes.rankTextFieldWrapper}>
      <AppTextField
        error={props.errorText !== undefined}
        helperText={props.errorText}
        name={props.namePrefix + ".name"}
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
        const result = props.schema.safeParse(values)
        if (!result.success) {
          return result.error.formErrors.fieldErrors
        }
      }}
      mutators={{ ...arrayMutators }}
      onSubmit={props.onSubmit}
      render={({
        handleSubmit,
        submitting,
        errors,
        submitError,
        form: {
          mutators: { push, pop },
        },
      }) => {
        const err = { ...errors }
        if (Array.isArray(err.items) && err.items.length === 0) {
          delete err.items
        }
        delete err.items
        return (
          <form onSubmit={handleSubmit}>
            {submitError && (
              <div role="alert" style={{ color: "red" }}>
                {submitError}
              </div>
            )}

            <AppTextField name="title" label={"タイトル"} fullWidth />
            <AppTextField name="description" label={"説明"} fullWidth />
            <FieldArray
              name="items"
              validate={(items) => {
                if (!props.schema) return
                return items.reduce((err, item, index) => {
                  const result = props.schema?.shape.items.element.safeParse(item)
                  if (!result.success) {
                    err[index] = result.error.formErrors.fieldErrors
                  }
                  return err
                }, {})
              }}
            >
              {({ fields, meta }) => {
                const handleMoreRankButton = () => push("items", {})
                return (
                  <>
                    {fields.map((name, index) => (
                      <RankFields
                        key={"RankFields" + index}
                        namePrefix={name}
                        rank={index + 1}
                        onClickDeleteButton={() => fields.remove(index)}
                        error={meta.error?.[index]}
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
                          disabled={submitting || (err && Object.keys(err).length > 0)}
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
