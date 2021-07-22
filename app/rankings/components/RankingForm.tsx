import { FormProps } from "app/core/components/Form"
import * as z from "zod"
import React, { useMemo, useState } from "react"
import {
  Button,
  Checkbox,
  ClickAwayListener,
  FormControlLabel,
  IconButton,
  makeStyles,
  Tooltip,
} from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import { Field, Form as FinalForm } from "react-final-form"
import { AppTextField } from "../../core/components/AppTextField"
import arrayMutators from "final-form-arrays"
import { FieldArray } from "react-final-form-arrays"
import { RankingItem } from "../../ranking-items/validations"
import { createPersistDecorator } from "final-form-persist"

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
  disabled?: boolean
}

const CheckBoxField = (props: CheckBoxFieldProps) => {
  const [openCheckBoxToolTip, setOpenCheckBoxToolTip] = React.useState(false)
  return (
    <Field
      type="checkbox"
      name={props.name}
      render={({ input, _meta }) => {
        const handleClick = () => {
          if (props.disabled) {
            setOpenCheckBoxToolTip(true)
          }
        }
        return (
          <ClickAwayListener onClickAway={setOpenCheckBoxToolTip.bind(null, false)}>
            <Tooltip
              PopperProps={{
                disablePortal: true,
              }}
              onClose={setOpenCheckBoxToolTip.bind(null, false)}
              open={openCheckBoxToolTip}
              arrow
              disableFocusListener
              disableHoverListener
              disableTouchListener
              title="他ユーザが作成したランキングでは変更できません"
            >
              <span onClick={handleClick}>
                <FormControlLabel
                  disabled={props.disabled}
                  control={
                    <Checkbox checked={input.checked} color="primary" disabled={props.disabled} />
                  }
                  label={props.label}
                  onChange={(_, checked) => input.onChange(checked)}
                />
              </span>
            </Tooltip>
          </ClickAwayListener>
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

export function RankingForm<S extends z.ZodObject<{ items: any }, any>>(
  props: FormProps<S> & { disableToChangeEditability: boolean }
) {
  const classes = useStyles()
  const [hasRankingItemError, setHasRankingItemError] = useState(true)
  console.log("has ranking item error", hasRankingItemError)
  // FIXME: use clear
  const { persistDecorator, clear } = useMemo(
    () =>
      createPersistDecorator({
        name: "newRankingForm",
        debounceTime: 500,
        blacklist: [],
        // whitelist: ["title"]
      }),
    []
  )
  return (
    <FinalForm
      decorators={[persistDecorator]}
      initialValues={props.initialValues}
      validate={(values) => {
        console.log(values)
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
        return (
          <form onSubmit={handleSubmit}>
            {submitError && (
              <div role="alert" style={{ color: "red" }}>
                {submitError}
              </div>
            )}

            <Field name="test">{({ input }) => <input placeholder="Test" {...input} />}</Field>
            <AppTextField
              name="title"
              label={"タイトル"}
              error={errors?.["title"]?.[0] !== undefined}
              helperText={errors?.["title"]?.[0]}
              fullWidth
            />
            <AppTextField
              name="description"
              label={"説明"}
              error={errors?.["description"]?.[0] !== undefined}
              helperText={errors?.["description"]?.[0]}
              fullWidth
            />
            <AppTextField name="source" label={"引用元"} fullWidth />
            <FieldArray
              name="items"
              validate={(items) => {
                if (!props.schema) return
                const errs = items.reduce((err, item, index) => {
                  const result = props.schema?.shape.items.element.safeParse(item)
                  if (!result.success) {
                    err[index] = result.error.formErrors.fieldErrors
                  }
                  return err
                }, {})
                console.log("errs", errs)
                setHasRankingItemError(Object.keys(errs).length !== 0)
                return errs
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
                      disabled={props.disableToChangeEditability}
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
                          disabled={
                            submitting ||
                            (err && Object.keys(err).length > 0) ||
                            hasRankingItemError
                          }
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
