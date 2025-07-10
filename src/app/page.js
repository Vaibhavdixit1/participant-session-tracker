"use client"
import Timeline from "@/components/Timeline";
import { IoClipboardOutline } from "react-icons/io5";
import meetingData from "@/data/meetingData";
import * as React from "react";
import * as Switch from "@radix-ui/react-switch";

// Transform participantArray to match Timeline props
const participants = meetingData.participantArray.map((p) => ({
  id: p.participantId,
  name: p.name,
  events: [
    ...(p.events.webcam || []).map(e => ({
      ts: new Date(e.start),
      type: "webcam-on"
    })),
    ...(p.events.mic || []).map(e => ({
      ts: new Date(e.start),
      type: "mute"
    })),
    ...(p.events.errors || []).map(e => ({
      ts: new Date(e.start),
      type: "error"
    })),
  ],
  timelog: p.timelog
}));

const session = {
  start: new Date(meetingData.start),
  end: new Date(meetingData.end),
};

export default function Home() {
  const [showTimeline, setShowTimeline] = React.useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="border border-gray-400 my-10 max-w-7xl w-full mx-auto rounded-lg">
        <header className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <IoClipboardOutline className="h-5 w-5 text-white" />
            <h1 className="text-lg font-medium">
              Participants wise Session Timeline
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm">Show participant timeline</span>
            <Switch.Root
              className="w-10 h-6 bg-gray-300 rounded-full relative data-[state=checked]:bg-blue-600 outline-none cursor-pointer"
              checked={showTimeline}
              onCheckedChange={setShowTimeline}
              id="timeline-switch"
            >
              <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 translate-x-0 data-[state=checked]:translate-x-4" />
            </Switch.Root>
          </div>
        </header>
        <Timeline participants={participants} session={session} showRows={showTimeline} />
      </div>
    </div>
  );
}
