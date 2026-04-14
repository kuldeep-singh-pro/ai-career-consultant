import { useState } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { useUploadResume, useAnalyzeResume } from '../hooks/useResume';
import { Upload } from 'lucide-react';

export const ResumeAnalyzerPage: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const { mutate: uploadMutate, isPending: isUploading } = useUploadResume();
  const { mutate: analyzeMutate, isPending: isAnalyzing } = useAnalyzeResume();


  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type === 'application/pdf') {
      uploadMutate(file, {
        onSuccess: (data) => {
          analyzeMutate(data.id, {
            onSuccess: () => {
              alert('Resume analyzed successfully!');
            },
          });
        },
      });
    } else {
      alert('Please upload a PDF file');
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Resume Analyzer</h1>

        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8">
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
              dragActive ? 'border-blue-500 bg-blue-50 dark:bg-slate-700' : 'border-slate-300 dark:border-slate-600'
            }`}
          >
            <Upload className="mx-auto mb-4" size={48} />
            <h2 className="text-xl font-bold mb-2">Upload Your Resume</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">Drag and drop your PDF here or click to browse</p>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => e.target.files && e.target.files[0] && handleFile(e.target.files[0])}
              className="hidden"
              id="file-input"
            />
            <label htmlFor="file-input" className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700">
              Select File
            </label>
          </div>

          {(isUploading || isAnalyzing) && (
            <div className="mt-8 text-center">
              <p className="text-slate-600 dark:text-slate-400">
                {isUploading ? 'Uploading...' : 'Analyzing resume...'}
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};
