import { createClient, createMicophoneAndCameraTracks } from "agora-rtc-react";

const appId = import.meta.env.VITE_RTC_APP_ID;
const token = import.meta.env.VITE_RTC_TOKEN;

export const config = {
  mode: "rtc",
  codec: "vp8",
  appId: appId,
  token: token,
};

export const useClient = createClient(config);

export const useMicrophoneAndCameraTracks = createMicophoneAndCameraTracks();
export const channelName = import.meta.env.VITE_RTC_CHANNEL_NAME;
