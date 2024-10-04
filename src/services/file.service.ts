export const downloadCSVFile = (data: string, filename: string) => {
    const csvData = String(data);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a: any = document.createElement('a');
    a.href = url;
    a.download = `${filename}_${Math.floor(Date.now() / 1000)}.csv`;
    a.click();
};