import React, { useState } from 'react';
import './App.scss';
import AudioVisualizer from './AudioVisualizer';
import FileUpload from './components/FileUpload';
import LoadingSpinner from './components/LoadingSpinner';
import { validateImage } from './utils/fileValidation';
import { uploadToS3 } from './utils/s3Upload';
import { createRecord } from './utils/airtable';