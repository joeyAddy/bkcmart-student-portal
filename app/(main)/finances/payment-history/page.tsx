import { Page } from "@/components/shared/page-template";
import { PaymentHistorySection } from "@/components/page-sections/finances/payment-history";

export default function PaymentHistoryPage() {
  return (
    <Page
      title="Payment History"
      description="View your complete payment history and transaction records"
    >
      <PaymentHistorySection />
    </Page>
  );
}
