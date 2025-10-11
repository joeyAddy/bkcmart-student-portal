import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col space-y-2 pb-6 border-b">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      {description && (
        <p className="text-lg text-muted-foreground">{description}</p>
      )}
      {children}
    </div>
  );
}

interface PageProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

export function Page({ title, description, children }: PageProps) {
  return (
    <div className="px-4 lg:px-6 space-y-6">
      <PageHeader title={title} description={description} />
      <div className="space-y-6">
        {children || (
          <div className="flex items-center justify-center h-64 border border-dashed rounded-lg">
            <div className="text-center">
              <h2 className="text-lg font-semibold">Coming Soon</h2>
              <p className="text-sm text-muted-foreground">
                This page is under development
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
