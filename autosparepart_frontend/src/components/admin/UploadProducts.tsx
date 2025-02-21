import { useAppDispatch, useAppSelector } from "@/app/hooks";
import {
  resetUploadState,
  uploadProducts,
} from "@/features/products/uploadSlice";
import { useCallback } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FileSpreadsheet, Upload } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
import { UploadResponse } from "@/types";

interface ExcelUploadProps {
  onUploadSuccess?: (response: UploadResponse) => void;
}

const UploadProducts = ({ onUploadSuccess }: ExcelUploadProps) => {
  const dispatch = useAppDispatch();
  const {
    status,
    error,
    item: importResponse,
  } = useAppSelector((state) => state.upload);

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const isExcel = [
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ].includes(file.type);

      if (!isExcel) {
        alert("Please upload only Excel files");
        return;
      }

      try {
        const resultAction = await dispatch(uploadProducts(file));
        if (uploadProducts.fulfilled.match(resultAction) && onUploadSuccess) {
          onUploadSuccess(resultAction.payload);
        }
      } catch (err) {
        console.error("Upload failed:", err);
      }
    },
    [dispatch, onUploadSuccess]
  );

  const handleReset = useCallback(() => {
    dispatch(resetUploadState());
  }, [dispatch]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          type="file"
          accept=".xls,.xlsx"
          onChange={handleFileChange}
          disabled={status && status === "loading"}
          className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
        />
        <Button
          variant="outline"
          size="icon"
          onClick={handleReset}
          disabled={status && status === "loading"}
        >
          <Upload className="h-4 w-4" />
        </Button>
      </div>

      {status && status === "loading" && (
        <Alert>
          <FileSpreadsheet className="h-4 w-4" />
          <AlertDescription>Uploading your Excel file...</AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {status && status === "succeeded" && importResponse && (
        <Alert variant="default">
          <AlertDescription>
            {importResponse.successCount}
            {importResponse.successCount && (
              <div className="mt-2">
                Total processed: {importResponse.successCount}
              </div>
            )}
            {importResponse.errorCount &&
              importResponse.errorCount.length > 0 && (
                <div className="mt-2">
                  Failed entries:
                  <ul className="list-disc pl-4 mt-1">
                    {importResponse.errors.map((entry, index) => (
                      <li key={index}>
                        Row {index}: {entry}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default UploadProducts;
