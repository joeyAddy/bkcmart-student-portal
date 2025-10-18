"use client";

import { PersonalInformationForm } from "./personal-information-form";
import { AddressInformationForm } from "./address-information-form";
import { ProfilePhotoUpload } from "./profile-photo-upload";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function ProfileSettingsSection() {
  const handleSave = () => {
    console.log("Saving profile settings...");
    // TODO: Implement save functionality
  };

  const handleCancel = () => {
    console.log("Cancelling profile changes...");
    // TODO: Implement cancel functionality
  };

  return (
    <div className="space-y-6">
      {/* Grid Layout - Photo on right for large screens, top for small */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Forms Section - Left side on large screens */}
        <Card className="xl:col-span-2 space-y-6 border p-6 rounded-md">
          {/* Personal Information Section */}
          <div className="flex flex-col space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Personal Information</h3>
              <p className="text-sm text-muted-foreground">
                Update your personal details and contact information
              </p>
            </div>
            <PersonalInformationForm />
          </div>

          {/* Address Information Section */}
          <div className="flex flex-col space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Address Information</h3>
              <p className="text-sm text-muted-foreground">
                Update your address and location details
              </p>
            </div>
            <AddressInformationForm />
          </div>
        </Card>

        {/* Profile Photo Section - Right side on large screens, top on small */}
        <Card className="xl:col-span-1 h-fit order-first xl:order-last border p-6 rounded-md">
          <div className="flex flex-col space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Profile Photo</h3>
              <p className="text-sm text-muted-foreground">
                Update your profile picture
              </p>
            </div>
            <ProfilePhotoUpload />
          </div>
        </Card>
      </div>

      {/* Save and Cancel Buttons */}
      <div className="flex gap-3 pt-6 border-t">
        <Button onClick={handleSave}>Save Changes</Button>
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
