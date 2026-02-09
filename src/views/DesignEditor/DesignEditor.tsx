import useEditorType from "~/hooks/useEditorType"
import SelectEditor from "./SelectEditor"
import VideoEditor from "./VideoEditor"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import Preview from "./components/Preview"

function DesignEditor() {
  const editorType = useEditorType()
  const { displayPreview, setDisplayPreview } = useDesignEditorContext()

  return (
    <>
      {displayPreview && <Preview isOpen={displayPreview} setIsOpen={setDisplayPreview} />}

      {
        {
          NONE: <SelectEditor />,
          VIDEO: <VideoEditor />,
        }[editorType]
      }
    </>
  )
}

export default DesignEditor
