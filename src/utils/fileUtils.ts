
export const saveFileLocally = async (file: File, folder: string): Promise<string> => {
  const fileName = `${Date.now()}-${file.name}`;
  const filePath = `uploadfile/${folder}/${fileName}`;

  // Save the file to the local 'uploadfile' folder
  const reader = new FileReader();
  reader.onload = async (event) => {
    const content = event.target?.result;
    // Use the File System Access API to save the file
    // Note: This API is not supported in all browsers
    if ('showSaveFilePicker' in window) {
      try {
        const fileHandle = await (window as any).showSaveFilePicker({
          suggestedName: fileName,
          types: [{
            description: 'Image',
            accept: { 'image/*': ['.png', '.jpg', '.jpeg'] }
          }]
        });
        const writable = await fileHandle.createWritable();
        await writable.write(content);
        await writable.close();
      } catch (error) {
        console.error('Error saving file:', error);
      }
    } else {
      console.warn('File System Access API is not supported in this browser');
    }
  }; reader.readAsArrayBuffer(file);

  return filePath;
};
