import React from 'react'

type FileUploadProps = {
}

/**
 *
 */
export const FileUpload = (props: FileUploadProps) => {
  return (
    <form className="form-inline">
      <label className="upload-button" htmlFor="upload">upload a file</label>
      <input type="file" />
    </form>
  )
}
