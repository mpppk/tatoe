import {
  Avatar,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core"
import MenuIcon from "@material-ui/icons/Menu"
import React, { useState, Suspense } from "react"
import { Link, Routes, useRouter, useSession } from "blitz"

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

interface AppDrawerProps {
  open: boolean
  onClose: () => void
}

const AppDrawer: React.FC<AppDrawerProps> = (props) => {
  return (
    <Drawer anchor="left" open={props.open} onClose={props.onClose}>
      <div role="presentation" onClick={props.onClose} onKeyDown={props.onClose}>
        <List>
          {/*FIXME*/}
          <Link href={"/"}>
            <ListItem button>
              <ListItemText primary={"tatoeとは"} />
            </ListItem>
          </Link>
          <Link href={Routes.RankingsPage()}>
            <ListItem button>
              <ListItemText primary={"新着ランキングを見る"} />
            </ListItem>
          </Link>
          <Link href={Routes.NewRankingPage()}>
            <ListItem button>
              <ListItemText primary={"ランキングを作る"} />
            </ListItem>
          </Link>
        </List>
      </div>
    </Drawer>
  )
}

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
  const [open, setOpen] = useState(false)
  const closeDrawer = setOpen.bind(null, false)
  const classes = useStyles()
  const session = useSession()

  const router = useRouter()
  const handleClickLogOut = () => {
    router.push(Routes.LogOutPage())
  }
  return (
    <Toolbar>
      <Suspense fallback={<div>loading header...</div>}>
        <AppDrawer open={open} onClose={closeDrawer} />
        <IconButton
          edge="start"
          className={classes.menuButton}
          color={"inherit"}
          aria-label="menu"
          onClick={setOpen.bind(null, !open)}
        >
          <MenuIcon />
        </IconButton>
        <Link href={"/"}>
          <Typography variant="h6" className={classes.title}>
            tatoe
          </Typography>
        </Link>
        {session.userId ? (
          <ProfileButton onClickLogout={handleClickLogOut} />
        ) : (
          <Button color="inherit">Login</Button>
        )}
      </Suspense>
    </Toolbar>
  )
}
