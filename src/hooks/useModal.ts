import { useMemo, useState, useCallback, ReactNode } from "react";

interface ModalState {
  id: string;
  title: string;
  content: ReactNode | string;
  // You can add any other properties you expect the state object to have
  // For example: id: number;
}

interface ModalHook {
  show: any;
  onClose: () => void;
  onCancel: () => void;
  close: () => void;
  isModalOpen: boolean;
  // Add any other properties you expect the hook to return
}

const useModal = (onClose?: (callback: () => void) => void): ModalHook => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [state, setState] = useState<ModalState | null>(null);

  const show = useCallback(
    (s: ModalState | null = null) => {
      setIsModalOpen(true);
      setState(s);
    },
    [setIsModalOpen, setState]
  );

  const close = useCallback(() => {
    if (onClose) {
      onClose(() => {
        setIsModalOpen(false);
      });
    } else {
      setIsModalOpen(false);
    }
    setState(null);
  }, [setState, onClose]);

  return useMemo(() => {
    return { show, onClose: close, onCancel: close, close, isModalOpen, open: isModalOpen, ...state };
  }, [state, isModalOpen, close, show]);
};

export default useModal;
