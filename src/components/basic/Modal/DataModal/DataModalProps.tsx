export interface DataModalProps {
    isModalOpen: boolean;
    // isLoading: boolean | undefined;
    show?: () => any;
    onCancel?: () => any;
    onChange?: (e: any) => void;
    value?: string;
    reason?: string;
    modalColumns?: any;
    modalData?: any;
    title?: string;
    width?: string;
}
