import { FormProps } from "app/core/components/Form"
import * as z from "zod"
import React from "react"
import { Button, Checkbox, FormControlLabel, IconButton, makeStyles } from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import { Field, Form as FinalForm } from "react-final-form"
import { AppTextField } from "../../core/components/AppTextField"
import arrayMutators from "final-form-arrays"
import { FieldArray } from "react-final-form-arrays"
import { RankingItem } from "../../ranking-items/validations"

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

interface RankFieldsProps {
  namePrefix: string
  rank: number
  error?: Partial<Record<keyof RankingItem, string>>
  onClickDeleteButton: () => void
}

interface CheckBoxFieldProps {
  name: string
  label: string
}

const CheckBoxField = (props: CheckBoxFieldProps) => {
  return (
    <Field
      type="checkbox"
      name={props.name}
      render={({ input, _meta }) => {
        return (
          <FormControlLabel
            control={<Checkbox checked={input.checked} color="primary" />}
            label={props.label}
          />
        )
      }}
    />
  )
}

const RankFields: React.FC<RankFieldsProps> = (props) => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.rankTextFieldWrapper}>
        <AppTextField
          error={props?.error?.title !== undefined}
          helperText={props?.error?.title}
          name={props.namePrefix + ".title"}
          label={`${props.rank}位`}
          fullWidth
        />
        <DeleteButton disabled={props.rank === 1} onClickDeleteButton={props.onClickDeleteButton} />
      </div>
      <AppTextField
        error={props?.error?.subtitle !== undefined}
        helperText={props?.error?.subtitle}
        name={props.namePrefix + ".subtitle"}
        label={`${props.rank}位の説明`}
        fullWidth
      />
      <AppTextField
        error={props?.error?.description !== undefined}
        helperText={props?.error?.description}
        name={props.namePrefix + ".description"}
        label={`${props.rank}位の詳細な説明`}
        fullWidth
        multiline
        rows={2}
      />
    </>
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
          mutators: { push, _pop },
        },
      }) => {
        const err = { ...errors }
        if (Array.isArray(err.items) && err.items.length === 0) {
          delete err.items
        }
        delete err.items
        console.log("err", err)
        return (
          <form onSubmit={handleSubmit}>
            {submitError && (
              <div role="alert" style={{ color: "red" }}>
                {submitError}
              </div>
            )}

            <AppTextField name="title" label={"タイトル"} fullWidth />
            <AppTextField name="description" label={"説明"} fullWidth />
            <AppTextField name="source" label={"引用元"} fullWidth />
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
                    <CheckBoxField
                      name={"canBeEditedByAnotherUser"}
                      label={"他ユーザによる編集を許可"}
                    />
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
