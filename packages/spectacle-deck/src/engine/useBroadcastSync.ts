import React from "react";

/**
 * Messages exchanged between presenter and audience tabs via BroadcastChannel.
 */
export type SyncMessage =
  | { type: "navigate"; slideIndex: number; stepIndex: number }
  | { type: "presenter-opened" }
  | { type: "presenter-closed" };

const CHANNEL_NAME = "pestacle-sync";

/**
 * Hook for cross-tab synchronization using BroadcastChannel.
 *
 * When `enabled` is true, every navigation in this tab is broadcast to other
 * tabs, and incoming navigation messages are applied via `onReceive`.
 */
export function useBroadcastSync({
  enabled,
  onReceive,
}: {
  enabled: boolean;
  onReceive: (msg: SyncMessage) => void;
}) {
  const channelRef = React.useRef<BroadcastChannel | null>(null);
  const onReceiveRef = React.useRef(onReceive);
  onReceiveRef.current = onReceive;

  React.useEffect(() => {
    if (!enabled) {
      channelRef.current?.close();
      channelRef.current = null;
      return;
    }

    const channel = new BroadcastChannel(CHANNEL_NAME);
    channelRef.current = channel;

    channel.onmessage = (event: MessageEvent<SyncMessage>) => {
      onReceiveRef.current(event.data);
    };

    return () => {
      channel.close();
      channelRef.current = null;
    };
  }, [enabled]);

  const broadcast = React.useCallback((msg: SyncMessage) => {
    channelRef.current?.postMessage(msg);
  }, []);

  return { broadcast };
}
