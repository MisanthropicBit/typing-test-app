import React from 'react'

type FileUploadProps = {
}

/**
 * File upload component
 */
export const FileUpload = (props: FileUploadProps) => {
  return (
    <form className="form-inline">
      <label className="upload-button" htmlFor="upload">upload a file</label>
      <input type="file" />
    </form>
  )
}
