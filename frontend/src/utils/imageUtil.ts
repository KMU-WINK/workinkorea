interface Base64ToFileProps {
  base64String?: string;
  fileName: string;
}

export const base64ToFile = ({ base64String, fileName }: Base64ToFileProps) => {
  if (base64String) {
    const byteString = window.atob(base64String);

    const byteArray = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      byteArray[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([byteArray], { type: 'image/jpeg' });

    const file = new File([blob], fileName, { type: 'image/jpeg' });

    return file;
  }
  return;
};
