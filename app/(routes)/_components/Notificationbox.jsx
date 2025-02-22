import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  useInboxNotifications,
  useUpdateRoomNotificationSettings,
  useUnreadInboxNotificationsCount,
} from "@liveblocks/react/suspense";
import {
  InboxNotification,
  InboxNotificationList,
} from "@liveblocks/react-ui";

const Notificationbox = ({ children, params }) => {
  const { inboxNotifications } = useInboxNotifications();
  const update = useUpdateRoomNotificationSettings();
  const { count } = useUnreadInboxNotificationsCount();
  
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    update({ threads: "all" });
  }, [count]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true); // Show after 3 seconds (adjustable)
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null; // Do not render until parent loads

  return (
    <div>
      <Popover>
        <PopoverTrigger>
          <div className="flex">
            {children}
            <span className="bg-primary rounded-full px-1 relative right-2 top-1">
              {count}
            </span>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[30%] ml-2 md:w-[50%]">
          <InboxNotificationList>
            {inboxNotifications.map((inboxNotification) => (
              <InboxNotification
                key={inboxNotification.id}
                inboxNotification={inboxNotification}
              />
            ))}
          </InboxNotificationList>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Notificationbox;
