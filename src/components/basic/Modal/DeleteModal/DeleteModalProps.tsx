export interface DeleteModalProps {
    isModalOpen: boolean;
    isLoading: boolean | undefined;
    show?: () => any;
    onCancel?: () => any;
    onConfirm?: () => any;
}