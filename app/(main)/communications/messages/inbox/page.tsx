import { Page } from "@/components/shared/page-template";
import { InboxSection } from "@/components/page-sections/communications/messages/inbox-section";

export default function InboxPage() {
  return (
    <Page title="Inbox" description="Read and manage your personal messages">
      <InboxSection />
    </Page>
  );
}
