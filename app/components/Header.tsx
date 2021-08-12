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
import { useAnchor } from "../core/hooks/useAnchor"
import Loading from "../components/Loading"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    cursor: "pointer",
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
              <ListItemText primary={"たぶんアレくらいとは"} />
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

interface ProfileListProps {
  anchorEl: null | HTMLElement
  onClickMyPage: () => void
  onClickLogout: () => void
  onClose: () => void
}

const ProfileMenu: React.FunctionComponent<ProfileListProps> = (props) => {
  return (
    <Menu
      anchorEl={props.anchorEl}
      keepMounted={true}
      open={Boolean(props.anchorEl)}
      onClose={props.onClose}
    >
      <MenuItem onClick={props.onClickMyPage}>マイページ</MenuItem>
      <MenuItem onClick={props.onClickLogout}>Logout</MenuItem>
    </Menu>
  )
}

interface ProfileButtonProps {
  pictureUrl: string | undefined
  onClickMyPage: () => void
  onClickLogout: () => void
}

const ProfileButton: React.FC<ProfileButtonProps> = (props) => {
  const classes = useStyles()

  const { anchorEl, setClickedElAsAnchor, clearAnchor } = useAnchor()
  const handleClickMyPage = () => {
    clearAnchor()
    props.onClickMyPage()
  }
  const handleClickLogout = () => {
    clearAnchor()
    props.onClickLogout()
  }

  return (
    <div>
      <Button
        aria-controls="profile-menu"
        aria-haspopup="true"
        color="inherit"
        onClick={setClickedElAsAnchor}
      >
        <Avatar
          aria-label="user profile avatar"
          src={props.pictureUrl}
          alt="Avatar Icon"
          className={classes.avatar}
        />
      </Button>
      <ProfileMenu
        anchorEl={anchorEl}
        onClickMyPage={handleClickMyPage}
        onClickLogout={handleClickLogout}
        onClose={clearAnchor}
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
  const handleClickMyPage = () => {
    router.push(Routes.UserPage({ userId: session.userId as string }))
  }
  const handleClickLogOut = () => {
    router.push(Routes.LogOutPage())
  }
  return (
    <Toolbar>
      <Suspense fallback={<Loading />}>
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
            たぶんアレくらい
          </Typography>
        </Link>
        {session.userId ? (
          <ProfileButton
            pictureUrl={session.pictureUrl ?? undefined}
            onClickMyPage={handleClickMyPage}
            onClickLogout={handleClickLogOut}
          />
        ) : (
          <Link href={Routes.LoginPage()}>
            <Button color="inherit">Login</Button>
          </Link>
        )}
      </Suspense>
    </Toolbar>
  )
}
