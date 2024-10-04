export interface EditStatusModalProps {
    isModalOpen: boolean;
    isLoading: boolean | undefined;
    show?: () => any;
    onCancel?: () => any;
    onConfirm?: () => any;
    onChange?: (e:any) => void;
    value?: string,
    reason?: string,
}