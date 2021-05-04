import { Header } from "../../../components/Header"
import { Button, Container, makeStyles, TextField, Typography } from "@material-ui/core"
import DeleteIcon from "@material-ui/icons/Delete"
import React from "react"

const useStyles = makeStyles((theme) => ({
  rankEditWrapper: {
    display: "flex",
    alignItems: "center",
  },
}))

const RankingEdit = () => {
  const classes = useStyles()

  return (
    <>
      <Header />
      <Container>
        <Typography variant={"h5"}>XXXランキング</Typography>
        <TextField label="タイトル" fullWidth defaultValue={"2020年の安打数"} />
        <TextField label="説明" fullWidth defaultValue={"2020年の安打数ランキングです"} />
        <div className={classes.rankEditWrapper}>
          <TextField label="1位" fullWidth defaultValue={"XXX"} />
          <DeleteIcon />
        </div>
        <div className={classes.rankEditWrapper}>
          <TextField label="2位" fullWidth defaultValue={"XXX"} />
          <DeleteIcon />
        </div>
        <div className={classes.rankEditWrapper}>
          <TextField label="3位" fullWidth defaultValue={"XXX"} />
          <DeleteIcon />
        </div>
        <Button color={"primary"} variant={"outlined"}>
          Add
        </Button>
      </Container>
    </>
  )
}
export default RankingEdit
