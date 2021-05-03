import { BlitzPage, Link } from "blitz"
import { Button, Container, makeStyles, Typography } from "@material-ui/core"
import React from "react"
import { Header } from "../../components/AppBar"

const useStyles = makeStyles((theme) => ({
  tweetButtonWrapper: {
    display: "flex",
    justifyContent: "flex-end",
  },
}))

const Compare: BlitzPage = () => {
  const classes = useStyles()
  const text = "「山寺宏一」は「声優知名度」界の「tourist」です"
  // const text = '「2020年の安打数」における「近本光司」を「ガンダムの人気キャラクター」で例えると、「カミーユ」ぐらいです';
  const tweetText = text + "\nhttps://tatoe.nibo.sh/c/xxx"
  return (
    <>
      <Header />
      <Container>
        <Typography variant={"h5"}>{text}</Typography>
        <Link href={`https://twitter.com/intent/tweet?text=${tweetText}`}>
          <div className={classes.tweetButtonWrapper}>
            <Button color="primary" variant={"contained"}>
              Tweet
            </Button>
          </div>
        </Link>

        <div>声優知名度ランキングを見る</div>
        <div>山寺宏一を他で例える</div>
        <div>atcoderのレーティングランキングを見る</div>
        <div>touristを他で例える</div>
        {/*<div>2020年の安打数ランキングを見る</div>*/}
        {/*<div>近本光司を他で例える</div>*/}
        {/*<div>ガンダムの人気キャラクターのランキングを見る</div>*/}
        {/*<div>カミーユを他で例える</div>*/}
      </Container>
    </>
  )
}

export default Compare
