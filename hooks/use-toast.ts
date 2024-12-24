import { toast } from "sonner";

export function useToast() {
  return {
    toast: (props: { title: string; description: string; variant?: 'default' | 'destructive' }) => {
      if (props.variant === 'destructive') {
        return toast.error(props.title, {
          description: props.description
        });
      }
      return toast.success(props.title, {
        description: props.description
      });
    }
  };
}