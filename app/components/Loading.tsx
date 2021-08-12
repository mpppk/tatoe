import React from "react"
import { makeStyles, CircularProgress } from "@material-ui/core"

const Loading = () => {
  const useStyles = makeStyles((_theme) => ({
    loadingLayout: {
      marginLeft: "auto",
      marginRight: "auto",
      width: "max-content",
      marginTop: "10vh",
      display: "block",
    },
  }))
  const className = useStyles()
  return (
    <div>
      <CircularProgress disableShrink className={className.loadingLayout} />
    </div>
  )
}

export default Loading
