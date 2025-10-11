import { Page } from "@/components/shared/page-template";
import { RecordedClassDetailSection } from "@/components/page-sections/courses/virtual-recorded/detail";

interface RecordedClassDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function RecordedClassDetailPage({
  params,
}: RecordedClassDetailPageProps) {
  const { id } = await params;

  return (
    <Page
      title="Recorded Class"
      description="Watch and interact with recorded class content"
    >
      <RecordedClassDetailSection classId={id} />
    </Page>
  );
}
