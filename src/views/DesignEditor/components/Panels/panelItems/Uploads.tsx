import React from "react"
import { Block } from "baseui/block"
import AngleDoubleLeft from "~/components/Icons/AngleDoubleLeft"
import Scrollable from "~/components/Scrollable"
import { Button, SIZE } from "baseui/button"
import DropZone from "~/components/Dropzone"
import { useEditor } from "@layerhub-io/react"
import useSetIsSidebarOpen from "~/hooks/useSetIsSidebarOpen"
import { nanoid } from "nanoid"

export default function () {
  const inputFileRef = React.useRef<HTMLInputElement>(null)
  const [uploads, setUploads] = React.useState<any[]>([])
  const editor = useEditor()
  const setIsSidebarOpen = useSetIsSidebarOpen()

  const handleDropFiles = (files: FileList) => {
    const file = files[0]
    const fileType = file.type.split('/')[0]
    const url = URL.createObjectURL(file)
    
    const upload = {
      id: nanoid(),
      url,
      type: fileType,
      name: file.name,
    }
    setUploads([...uploads, upload])
  }

  const handleInputFileRefClick = () => {
    inputFileRef.current?.click()
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDropFiles(e.target.files!)
  }

  const addImageToCanvas = (url: string) => {
    const options = {
      type: "StaticImage",
      src: url,
    }
    editor.objects.add(options)
  }

  const addVideoToCanvas = async (url: string) => {
    const video = document.createElement('video')
    video.src = url
    video.crossOrigin = "anonymous"
    
    await new Promise((resolve) => {
      video.addEventListener('loadedmetadata', () => {
        video.currentTime = 1
      })
      video.addEventListener('seeked', resolve)
    })

    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext('2d')!.drawImage(video, 0, 0)
    
    const preview = canvas.toDataURL()
    const duration = video.duration

    const options = {
      type: "StaticVideo",
      src: url,
      preview,
      duration,
    }
    editor.objects.add(options)
  }

  const handleFileClick = (upload: any) => {
    if (upload.type === 'image') {
      addImageToCanvas(upload.url)
    } else if (upload.type === 'video') {
      addVideoToCanvas(upload.url)
    }
  }
  return (
    <DropZone handleDropFiles={handleDropFiles}>
      <Block $style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Block
          $style={{
            display: "flex",
            alignItems: "center",
            fontWeight: 500,
            justifyContent: "space-between",
            padding: "1.5rem",
          }}
        >
          <Block>Uploads</Block>

          <Block onClick={() => setIsSidebarOpen(false)} $style={{ cursor: "pointer", display: "flex" }}>
            <AngleDoubleLeft size={18} />
          </Block>
        </Block>
        <Scrollable>
          <Block padding={"0 1.5rem"}>
            <Button
              onClick={handleInputFileRefClick}
              size={SIZE.compact}
              overrides={{
                Root: {
                  style: {
                    width: "100%",
                  },
                },
              }}
            >
              Computer
            </Button>
            <input onChange={handleFileInput} type="file" id="file" ref={inputFileRef} style={{ display: "none" }} accept="image/*,video/*" />

            <div
              style={{
                marginTop: "1rem",
                display: "grid",
                gap: "0.5rem",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              {uploads.map((upload) => (
                <div
                  key={upload.id}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    flexDirection: "column",
                    gap: "0.5rem",
                  }}
                  onClick={() => handleFileClick(upload)}
                >
                  <div style={{ position: "relative", width: "100%" }}>
                    {upload.type === 'video' ? (
                      <video 
                        width="100%" 
                        src={upload.url} 
                        style={{ maxHeight: "120px", objectFit: "cover" }}
                        muted
                      />
                    ) : (
                      <img width="100%" src={upload.url} alt="preview" style={{ maxHeight: "120px", objectFit: "cover" }} />
                    )}
                    <div style={{ 
                      position: "absolute", 
                      bottom: "4px", 
                      right: "4px", 
                      background: "rgba(0,0,0,0.7)", 
                      color: "white", 
                      padding: "2px 6px", 
                      borderRadius: "4px", 
                      fontSize: "10px" 
                    }}>
                      {upload.type.toUpperCase()}
                    </div>
                  </div>
                  <div style={{ fontSize: "12px", textAlign: "center", wordBreak: "break-word" }}>
                    {upload.name}
                  </div>
                </div>
              ))}
            </div>
          </Block>
        </Scrollable>
      </Block>
    </DropZone>
  )
}
