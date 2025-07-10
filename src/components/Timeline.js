import React from "react";
import TimeAxis from "./TimeAxis";
import { ParticipantRow } from "./ParticipantRow";

export default function Timeline({ participants, session, showRows }) {
  // Dynamically set interval based on session length
  const totalMins = Math.max(1, (session.end - session.start) / 1000 / 60);
  let interval = 2;
  if (totalMins > 60) interval = 10;
  else if (totalMins > 30) interval = 5;
  else if (totalMins < 15) interval = 1;
  return (
    <>
      <TimeAxis start={session.start} end={session.end} interval={interval} />
      <div
        className="p-8 rounded-lg"
        style={{
          backgroundImage: `
          linear-gradient(to right, rgba(55, 65, 81, 0.2) 1px, transparent 2px),
          linear-gradient(to bottom, rgba(55, 65, 81, 0.2) 1px, transparent 2px)
        `,
          backgroundSize: "100px 100px",
        }}
      >
        {participants.map((p) => (
          <ParticipantRow
            key={p.id}
            name={p.name}
            events={p.events}
            timelog={p.timelog}
            sessionStart={session.start}
            sessionEnd={session.end}
            showTrack={showRows} // Pass the prop
          />
        ))}
      </div>
    </>
  );
}
