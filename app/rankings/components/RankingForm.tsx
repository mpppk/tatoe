import * as z from "zod"
import React, { useCallback, useEffect, useMemo } from "react"
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
import {
  Field,
  Form as FinalForm,
  FormProps as FinalFormProps,
  useFormState,
} from "react-final-form"
import { AppTextField } from "../../core/components/AppTextField"
import arrayMutators from "final-form-arrays"
import { FieldArray, useFieldArray } from "react-final-form-arrays"
import { RankingItem } from "../../ranking-items/validations"
import { createPersistDecorator } from "final-form-persist"
import { CreateRankingForm, UpdateRankingForm } from "../validations"

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

interface FormControlProps {
  disableToChangeEditability: boolean
  disableSubmitButton: boolean
  onClickMoreRankButton: () => void
  currentItemNum: number
  submitText: string
}

const RankingFormControl: React.FC<FormControlProps> = (props) => {
  const classes = useStyles()
  return (
    <>
      <CheckBoxField
        name={"canBeEditedByAnotherUser"}
        label={"他ユーザによる編集を許可"}
        disabled={props.disableToChangeEditability}
      />
      <div className={classes.buttonWrapper}>
        <Button
          className={classes.moreRankButton}
          variant={"outlined"}
          onClick={props.onClickMoreRankButton}
        >
          {props.currentItemNum + 1 + "位を追加"}
        </Button>
        <Button
          type="submit"
          disabled={props.disableSubmitButton}
          variant={"contained"}
          color={"primary"}
        >
          {props.submitText}
        </Button>
      </div>
    </>
  )
}

interface RanksProps {
  disableToChangeEditability: boolean
  disableSubmitButton: boolean
  submitText: string
}

const RankItems: React.FC<RanksProps> = (props) => {
  const { fields, meta } = useFieldArray("items")
  const handleMoreRankButton = useCallback(() => fields.push({}), [fields])

  useEffect(() => {
    if (fields.length === 0) {
      fields.push({})
    }
  }, [fields])

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
      <RankingFormControl
        disableToChangeEditability={props.disableToChangeEditability}
        disableSubmitButton={props.disableSubmitButton}
        onClickMoreRankButton={handleMoreRankButton}
        currentItemNum={fields.length ?? 0}
        submitText={props.submitText}
      />
    </>
  )
}

const rankingItemValidator = (rankingItemSchema: z.ZodType<any, any>, items) => {
  if (!items) return
  return items.map((item) => {
    const result = rankingItemSchema.safeParse(item)
    if (result.success) {
      return null
    }
    const issues = result.error.issues.reduce((prev, issue) => {
      return { ...prev, [issue.path.join("/")]: issue.message }
    }, {})
    return result.success ? null : issues
  })
}

interface RankingMainProps {
  onSubmit: () => void
  rankingItemSchema: z.ZodType<any, any>
  disableToChangeEditability: boolean
  submitText: string
}

const RankingFormMain: React.FC<RankingMainProps> = (props) => {
  const { submitting, errors, submitError } = useFormState()
  console.log("errors", errors)
  if (errors?.items?.filter((i) => i)?.length === 0) {
    delete errors.items
  }
  return (
    <form onSubmit={props.onSubmit}>
      {submitError && (
        <div role="alert" style={{ color: "red" }}>
          {submitError}
        </div>
      )}

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
        validate={rankingItemValidator.bind(null, props.rankingItemSchema)}
        render={() => {
          return (
            <RankItems
              disableToChangeEditability={props.disableToChangeEditability}
              disableSubmitButton={submitting || Object.keys(errors ?? {}).length > 0}
              submitText={props.submitText}
            />
          )
        }}
      />
    </form>
  )
}

interface RankingFormBaseProps<S extends z.ZodObject<{ items: any }, any>> {
  schema: S
  onSubmit: FinalFormProps<z.infer<S>>["onSubmit"]
  initialValues?: FinalFormProps<z.infer<S>>["initialValues"]
  disableToChangeEditability: boolean
}

interface RankingFormNewProps extends RankingFormBaseProps<typeof CreateRankingForm> {
  mode: "new"
}

interface RankingFormEditProps extends RankingFormBaseProps<typeof UpdateRankingForm> {
  mode: "edit"
}

export const RankingForm: React.FC<RankingFormNewProps | RankingFormEditProps> = (props) => {
  const { persistDecorator, clear } = useMemo(
    () =>
      createPersistDecorator({
        name: "rankingForm/new",
        debounceTime: 500,
        blacklist: [],
      }),
    []
  )

  const handleSubmit = (...props2: Parameters<typeof props.onSubmit>) => {
    props.onSubmit.apply(null, props2)
    clear()
  }

  return (
    <FinalForm
      decorators={props.mode === "new" ? [persistDecorator] : []}
      initialValues={props.initialValues}
      validate={(values) => {
        console.log(values)
        const result = props.schema.safeParse(values)
        if (!result.success) {
          return result.error.formErrors.fieldErrors
        }
      }}
      mutators={{ ...arrayMutators }}
      onSubmit={handleSubmit}
      render={(formProps) => {
        return (
          <RankingFormMain
            onSubmit={formProps.handleSubmit}
            rankingItemSchema={props.schema.shape.items.element}
            disableToChangeEditability={props.disableToChangeEditability}
            submitText={props.mode === "new" ? "作成" : "更新"}
          />
        )
      }}
    />
  )
}
