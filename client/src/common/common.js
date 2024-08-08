export const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

 export  const getFirstLine=(content) => {
    if (content.length > 5) {
      return content.split('.')[0] + '...'
    }
    return content;
  }

  export const imagePath = (url) => {
    const trimmedPath = url?.split('upload\\')[1];
    return trimmedPath;
  };

  export const fileToBase64 =(file)=>new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
