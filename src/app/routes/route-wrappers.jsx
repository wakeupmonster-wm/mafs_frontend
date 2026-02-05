import { useParams } from "react-router-dom";
import { lazy } from "react";

// lazy imports (same pages)
const TicketDetailPage = lazy(() =>
  import("@/modules/support/pages/SupportPages").then(m => ({
    default: m.TicketDetailPage,
  }))
);

const ProfileReviewDetailPage = lazy(() =>
  import("@/modules/profileReview/pages/ProfileReviewPages").then(m => ({
    default: m.ProfileReviewDetailPage,
  }))
);

const ChatReviewDetail = lazy(() =>
  import("@/modules/chatManagement/pages/ChatReviewDetail")
);

// eslint-disable-next-line react-refresh/only-export-components
export function TicketWrapper() {
  const { ticketId } = useParams();
  return <TicketDetailPage ticketId={ticketId} />;
}

// eslint-disable-next-line react-refresh/only-export-components
export function ProfileReviewWrapper() {
  const { userId } = useParams();
  return <ProfileReviewDetailPage userId={userId} />;
}

// eslint-disable-next-line react-refresh/only-export-components
export function ChatReviewWrapper() {
  const { matchId } = useParams();
  return <ChatReviewDetail matchId={matchId} />;
}
