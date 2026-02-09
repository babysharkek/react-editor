import React from "react"
import { Block } from "baseui/block"

export default function ({ children }: { children: React.ReactNode }) {
  return (
    <Block
      $style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#000000",
        fontFamily: "Uber Move Text",
        color: "#FFFFFF",
      }}
    >
      {children}
    </Block>
  )
}
