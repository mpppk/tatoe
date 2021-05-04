import {
  Avatar,
  Button,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import React, { useState } from "react"
import { Link } from "@blitzjs/core"

interface User {
  name: string
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  avatar: {
    margin: 10,
  },
}))

interface IProfileListProps {
  anchorEl: null | HTMLElement
  onClickLogout: () => void
  onClose: () => void
}

const ProfileMenu: React.FunctionComponent<IProfileListProps> = (props) => {
  return (
    <Menu
      anchorEl={props.anchorEl}
      keepMounted={true}
      open={Boolean(props.anchorEl)}
      onClose={props.onClose}
    >
      <MenuItem onClick={props.onClickLogout}>マイページ</MenuItem>
      <MenuItem onClick={props.onClickLogout}>Logout</MenuItem>
    </Menu>
  )
}

interface ProfileButtonProps {
  onClickLogout: () => void
}

const ProfileButton: React.FC<ProfileButtonProps> = (props) => {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const handleClickProfileButton = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget)
  }
  const setNullAnchorEl = () => setAnchorEl(null)
  const handleClickLogout = () => {
    setNullAnchorEl()
    props.onClickLogout()
  }

  return (
    <div>
      <Button
        aria-controls="profile-menu"
        aria-haspopup="true"
        color="inherit"
        onClick={handleClickProfileButton}
      >
        <Avatar aria-label="user profile avatar" alt="Avatar Icon" className={classes.avatar} />
      </Button>
      <ProfileMenu
        anchorEl={anchorEl}
        onClickLogout={handleClickLogout}
        onClose={setNullAnchorEl}
      />
    </div>
  )
}

export const Header = () => {
  const classes = useStyles()
  const [user, setUser] = useState({ name: "test" } as User | null)
  const emptyHandler = () => {}
  return (
    <Toolbar>
      <IconButton edge="start" className={classes.menuButton} color={"inherit"} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <Link href={"/"}>
        <Typography variant="h6" className={classes.title}>
          tatoe
        </Typography>
      </Link>
      {user === null ? (
        <Button color="inherit">Login</Button>
      ) : (
        <ProfileButton onClickLogout={emptyHandler} />
      )}
    </Toolbar>
  )
}
