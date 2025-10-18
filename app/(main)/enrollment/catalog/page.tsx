import { Page } from "@/components/shared/page-template";
import { CourseCatalogSection } from "@/components/page-sections/enrollment/catalog";

export default function CourseCatalogPage() {
  return (
    <Page
      title="Course Catalog"
      description="Browse available courses and program offerings"
    >
      <CourseCatalogSection />
    </Page>
  );
}
