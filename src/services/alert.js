//==============================================================================
// ■ Alert (alert.js)
//------------------------------------------------------------------------------
//     Programmatic UI notifications wrapper.
//==============================================================================
import { NotificationProgrammatic as Notification } from "buefy";

export default {
  notification(
    message,
    type = "is-primary",
    position = "is-bottom-right",
    duration = 5000,
    queue = false
  ) {
    Notification.open({
      message,
      type,
      position,
      duration,
      queue
    });
  }
};
