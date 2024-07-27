import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './FileUpload.scss';

function FileUpload({ onUpload }) {
  const onDrop = useCallback((acceptedFiles) => {
    onUpload(acceptedFiles);
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'audio/mpeg': ['.mp3'],
      'image/*': ['.jpg', '.jpeg', '.png']
    },
    maxFiles: 2
  });

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      <div className="dropzone-content">
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag 'n' drop an MP3 and cover image, or click to select files</p>
        )}
      </div>
    </div>
  );
}

export default FileUpload;