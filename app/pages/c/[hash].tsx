import { BlitzPage, Link } from "blitz"
import { Button, Container, makeStyles, Typography, Link as MUILink } from "@material-ui/core"
import TwitterIcon from "@material-ui/icons/Twitter"
import React from "react"
import { Header } from "../../components/Header"

const useStyles = makeStyles((theme) => ({
  tweetButtonWrapper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    display: "flex",
    justifyContent: "center",
  },
  tweetButton: {
    backgroundColor: "#00acee",
  },
  subHeader: {
    marginTop: theme.spacing(1),
  },
}))

const Compare: BlitzPage = () => {
  const classes = useStyles()
  // const text = "「山寺宏一」は「声優知名度」界の「tourist」です"
  const text =
    "「2020年の安打数」における「近本光司」を「ガンダムの人気キャラクター」で例えると、「カミーユ」ぐらいです"
  const tweetText = text + "\nhttps://tatoe.nibo.sh/c/xxx"
  return (
    <>
      <Header />
      <Container>
        <Typography variant={"h5"}>{text}</Typography>
        <Link href={`https://twitter.com/intent/tweet?text=${tweetText}`}>
          <div className={classes.tweetButtonWrapper}>
            <Button
              className={classes.tweetButton}
              startIcon={<TwitterIcon />}
              color="primary"
              variant={"contained"}
            >
              Tweet
            </Button>
          </div>
        </Link>

        {/*<div>声優知名度ランキングを見る</div>*/}
        {/*<div>山寺宏一を他で例える</div>*/}
        {/*<div>atcoderのレーティングランキングを見る</div>*/}
        {/*<div>touristを他で例える</div>*/}
        <Typography className={classes.subHeader} variant={"h6"}>
          関連ランキング
        </Typography>
        <Typography>
          <Link href={"/"}>
            <MUILink>2020年の安打数ランキング</MUILink>
          </Link>
        </Typography>
        <Typography>
          <Link href={"/"}>
            <MUILink>ガンダムの人気キャラクター</MUILink>
          </Link>
        </Typography>
        <Typography className={classes.subHeader} variant={"h6"}>
          他で例える
        </Typography>
        <Typography>
          <Link href={"/"}>
            <MUILink>近本光司を他で例える</MUILink>
          </Link>
        </Typography>
        <Typography>
          <Link href={"/"}>
            <MUILink>カミーユを他で例える</MUILink>
          </Link>
        </Typography>
      </Container>
    </>
  )
}

export default Compare
