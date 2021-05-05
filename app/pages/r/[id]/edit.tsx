import { Header } from "../../../components/Header"
import { Button, Container, makeStyles, TextField, Typography } from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import React from "react"

const useStyles = makeStyles((_theme) => ({
  rankEditWrapper: {
    display: "flex",
    alignItems: "center",
  },
}))

interface ItemFormProps {
  rank: number
  defaultValue: string
}

const ItemForm: React.FC<ItemFormProps> = (props) => {
  const classes = useStyles()
  return (
    <div className={classes.rankEditWrapper}>
      <TextField label={`${props.rank}位`} fullWidth defaultValue={props.defaultValue} />
      <DeleteIcon />
    </div>
  )
}

const RankingEdit = () => {
  return (
    <>
      <Header />
      <Container>
        <Typography variant={"h5"}>XXXランキング</Typography>
        <TextField label="タイトル" fullWidth defaultValue={"2020年の安打数"} />
        <TextField label="説明" fullWidth defaultValue={"2020年の安打数ランキングです"} />
        <ItemForm rank={1} defaultValue={"XXX"} />
        <ItemForm rank={2} defaultValue={"XXX"} />
        <ItemForm rank={3} defaultValue={"XXX"} />
        <Button color={"inherit"} variant={"outlined"}>
          Add Item
        </Button>
        <Button color={"inherit"} variant={"outlined"}>
          Cancel
        </Button>
        <Button color={"primary"} variant={"outlined"}>
          Save
        </Button>
      </Container>
    </>
  )
}
export default RankingEdit
