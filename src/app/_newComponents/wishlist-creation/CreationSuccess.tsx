import React from "react";
import Link from "next/link";
import Icon from "@/app/ui/commonComponents/AppIcon";
import ActionButton from "@/app/ui/commonComponents/ActionButton";

interface CreationSuccessProps {
  wishlistId: string;
  wishlistTitle: string;
  shareUrl: string;
}

const CreationSuccess = ({
  wishlistId,
  wishlistTitle,
  shareUrl,
}: CreationSuccessProps) => {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      // In a real app, you'd show a toast notification here
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="bg-surface rounded-lg border border-border p-8">
        {/* Success Icon */}
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="CheckCircleIcon" size={32} className="text-success" />
        </div>

        {/* Success Message */}
        <h2 className="text-2xl font-bold text-text-primary mb-4">
          Wishlist Created Successfully!
        </h2>
        <p className="text-text-secondary mb-8">
          Your wishlist "{wishlistTitle}" has been created and is ready to use.
        </p>

        {/* Share Section */}
        <div className="bg-muted rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center justify-center">
            <Icon name="ShareIcon" size={20} className="mr-2" />
            Share Your Wishlist
          </h3>

          <div className="flex items-center space-x-2 mb-4">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 px-4 py-3 bg-surface border border-border rounded-lg text-sm"
            />
            <ActionButton
              onClick={copyToClipboard}
              variant="outline"
              icon="ClipboardDocumentIcon"
              className="shrink-0"
            >
              Copy
            </ActionButton>
          </div>

          <p className="text-sm text-text-secondary">
            Share this link with friends and family so they know what you'd love
            to receive!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={`/wishlist/${wishlistId}`}>
            <ActionButton
              variant="primary"
              size="lg"
              icon="EyeIcon"
              className="w-full sm:w-auto"
            >
              View Wishlist
            </ActionButton>
          </Link>

          <Link href="/add-gift-item">
            <ActionButton
              variant="secondary"
              size="lg"
              icon="PlusIcon"
              className="w-full sm:w-auto"
            >
              Add First Item
            </ActionButton>
          </Link>

          <Link href="/user-dashboard">
            <ActionButton
              variant="outline"
              size="lg"
              icon="HomeIcon"
              className="w-full sm:w-auto"
            >
              Go to Dashboard
            </ActionButton>
          </Link>
        </div>

        {/* Next Steps */}
        <div className="mt-8 pt-6 border-t border-border">
          <h4 className="text-sm font-semibold text-text-primary mb-3">
            What's Next?
          </h4>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start space-x-2">
              <Icon
                name="PlusCircleIcon"
                size={16}
                className="text-primary mt-0.5 shrink-0"
              />
              <span className="text-text-secondary">
                Add gift items to your wishlist
              </span>
            </div>
            <div className="flex items-start space-x-2">
              <Icon
                name="ShareIcon"
                size={16}
                className="text-primary mt-0.5 shrink-0"
              />
              <span className="text-text-secondary">
                Share with friends and family
              </span>
            </div>
            <div className="flex items-start space-x-2">
              <Icon
                name="BellIcon"
                size={16}
                className="text-primary mt-0.5 shrink-0"
              />
              <span className="text-text-secondary">
                Get notified when items are purchased
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreationSuccess;
