import { toast, ToastOptions } from 'react-toastify';

const notificationParams: ToastOptions = {
  autoClose: 3000,
  hideProgressBar: true,
  theme: 'colored',
};

export const errorNotification = (text: string) => {
  return toast.error(text, notificationParams);
};

export const successNotification = (text: string) => {
  return toast.success(text, notificationParams);
};
