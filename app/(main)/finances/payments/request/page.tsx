import { Page } from "@/components/shared/page-template";
import { PaymentRequestsSection } from "@/components/page-sections/finances/payment-requests";

export default function MakePaymentPage() {
  return (
    <Page
      title="Payment Requests"
      description="View and manage your payment requests"
    >
      <PaymentRequestsSection />
    </Page>
  );
}
