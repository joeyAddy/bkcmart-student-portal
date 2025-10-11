import { Page } from "@/components/shared/page-template";
import { RecordedClassDetailSection } from "@/components/page-sections/courses/virtual-recorded/recorded-class-detail-section";

interface RecordedClassDetailPageProps {
  params: {
    id: string;
  };
}

export default function RecordedClassDetailPage({ params }: RecordedClassDetailPageProps) {
  return (
    <Page
      title="Recorded Class"
      description="Watch and interact with recorded class content"
    >
      <RecordedClassDetailSection classId={params.id} />
    </Page>
  );
}