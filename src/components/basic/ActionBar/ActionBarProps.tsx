export interface ActionBarProps {
    loading?: boolean;
    withSearch?: boolean;
    onSearch?: (searchKey: string) => any;
    customLeftActions?: any;
    withFilter?: boolean;
    onFilter?: () => any;
    customRightActions?: any;
    withSearchDatePicker?: boolean;
    onFromDateChanged?: () => any
    onToDateChanged?: () => any
}