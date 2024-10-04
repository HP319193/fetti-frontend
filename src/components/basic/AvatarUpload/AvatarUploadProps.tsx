export interface AvatarUploadProps {
    data: any;
    userType: string;
    onAvatarChange?(string: any): void;
    onUploadFinish?: any
}
