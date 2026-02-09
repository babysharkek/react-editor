import React from "react"
import { Block } from "baseui/block"
import { Button } from "baseui/button"
import { DesignType } from "~/interfaces/DesignEditor"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import Video from "~/components/Icons/Video"

export default function () {
  const { setEditorType } = useDesignEditorContext()

  return (
    <Block
      $style={{
        height: "100vh",
        width: "100vw",
        background: "#000000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Block
        $style={{
          textAlign: "center",
          color: "#ffffff",
        }}
      >
        <Video size={64} />
        <Block $style={{ fontSize: "2rem", fontWeight: "bold", margin: "1rem 0" }}>
          Video Editor
        </Block>
        <Block $style={{ fontSize: "1rem", opacity: 0.8, marginBottom: "2rem" }}>
          Professional video editing made simple
        </Block>
        <Button 
          $style={{ 
            width: "200px", 
            backgroundColor: "#ff0050",
            ":hover": {
              backgroundColor: "#e60048"
            }
          }} 
          onClick={() => setEditorType("VIDEO")}
        >
          Start Editing
        </Button>
      </Block>
    </Block>
  )
}
