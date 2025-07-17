import { toast } from 'sonner';

export const useToast = () => {
  const success = (title: string, message?: string) => {
    toast.success(title, {
      description: message,
      duration: 5000,
    });
  };

  const error = (title: string, message?: string) => {
    toast.error(title, {
      description: message,
      duration: 7000,
    });
  };

  const warning = (title: string, message?: string) => {
    toast.warning(title, {
      description: message,
      duration: 6000,
    });
  };

  const info = (title: string, message?: string) => {
    toast.info(title, {
      description: message,
      duration: 5000,
    });
  };

  return {
    success,
    error,
    warning,
    info,
  };
}; 