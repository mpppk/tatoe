import React from "react"

export interface Anchor {
  anchorEl: HTMLElement | null
  setClickedElAsAnchor: (e: React.MouseEvent<HTMLElement>) => void
  clearAnchor: () => void
}

export const useAnchor = (): Anchor => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  return {
    anchorEl,
    setClickedElAsAnchor: (e: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(e.currentTarget)
    },
    clearAnchor: () => setAnchorEl(null),
  }
}
