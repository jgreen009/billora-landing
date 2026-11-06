import { createDocumentViewModel } from "@/lib/document-model";
import {
  SAMPLE_INVOICE,
  WALKTHROUGH_PAYMENT_MINOR,
  WALKTHROUGH_SNAPSHOT_DATE,
} from "@/lib/sample-data";
import { formatCurrency } from "@/lib/money";
export const invoice = createDocumentViewModel(
  SAMPLE_INVOICE,
  WALKTHROUGH_PAYMENT_MINOR,
  WALKTHROUGH_SNAPSHOT_DATE,
);
export const money = (value: number) => formatCurrency(value, "USD");
