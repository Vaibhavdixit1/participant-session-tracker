import React from "react";
import {
  IoVideocamOutline,
  IoMicOffOutline,
  IoAlertCircleOutline,
  IoChevronForwardOutline,
  IoLogInOutline,
  IoLogOutOutline, 
} from "react-icons/io5";
import {
  differenceInMilliseconds,
  format,
  differenceInMinutes,
} from "date-fns";

export function ParticipantRow({
  name,
  events,
  timelog,
  sessionStart,
  sessionEnd,
  showTrack = true,
}) {
  // Basic error handling for missing/invalid data
  if (!name) {
    return (
      <div className="mb-4 text-red-500">
        Error: Participant name is missing.
      </div>
    );
  }
  if (!sessionStart || !sessionEnd) {
    return (
      <div className="mb-4 text-red-500">
        Error: Session start or end time is missing.
      </div>
    );
  }

  const safeEvents = Array.isArray(events) ? events : [];
  const safeTimelog = Array.isArray(timelog) ? timelog : [];

  const getPositionPercent = (ts) => {
    const total = differenceInMilliseconds(
      new Date(sessionEnd),
      new Date(sessionStart)
    );
    if (!ts || isNaN(new Date(ts))) return 0;
    const elapsed = differenceInMilliseconds(
      new Date(ts),
      new Date(sessionStart)
    );
    return total > 0 ? (elapsed / total) * 100 : 0;
  };

  const renderEventIcon = (type) => {
    // Set bg color based on type
    let bgClass = "bg-blue-600";
    if (type === "error") bgClass = "bg-red-500";
    if (type === "join" || type === "leave") bgClass = "bg-gray-400"; 

    return (
      <span
        className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${bgClass}`}
        style={{ overflow: "hidden" }}
      >
        {(() => {
          switch (type) {
            case "webcam-on":
              return <IoVideocamOutline className="w-4 h-4 text-white" />;
            case "mute":
              return <IoMicOffOutline className="w-4 h-4 text-white" />;
            case "error":
              return <IoAlertCircleOutline className="w-4 h-4 text-white" />;
            case "join":
              return (
                <IoLogInOutline className="w-4 h-4 text-white" title="Joined" />
              );
            case "leave":
              return (
                <IoLogOutOutline className="w-4 h-4 text-white" title="Left" />
              );
            default:
              return null;
          }
        })()}
      </span>
    );
  };

  let formattedDate = "";
  let formattedTime = "";
  let durationInMinutes = 0;
  try {
    formattedDate = format(new Date(sessionStart), "d LLLL yyyy");
    formattedTime = format(new Date(sessionStart), "HH:mm");
    durationInMinutes = differenceInMinutes(
      new Date(sessionEnd),
      new Date(sessionStart)
    );
  } catch {
    formattedDate = "Invalid date";
    formattedTime = "--:--";
    durationInMinutes = 0;
  }

  // Prepare join/leave markers from timelog
  const joinLeaveMarkers = [];
  safeTimelog.forEach((log, idx) => {
    if (log && log.start) {
      joinLeaveMarkers.push({
        ts: log.start,
        type: "join",
        key: `join-${idx}`,
      });
    }
    if (log && log.end) {
      joinLeaveMarkers.push({
        ts: log.end,
        type: "leave",
        key: `leave-${idx}`,
      });
    }
  });

  // Merge event icons and join/leave markers for rendering
  const allMarkers = [
    ...safeEvents.map((e, i) => ({ ...e, key: `event-${i}` })),
    ...joinLeaveMarkers,
  ];

  return (
    <div className="mb-4">
      {/* Header Info with View Details */}
      <div className="flex justify-between items-center my-4">
        <div>
          <span className="font-medium text-xl capitalize">{name}</span>
          <div className="text-sm text-gray-400">
            {formattedDate} | {formattedTime} | Duration: {durationInMinutes}{" "}
            Mins
          </div>
        </div>
        <button className="flex items-center text-blue-500 text-sm cursor-pointer">
          View Details
          <IoChevronForwardOutline className="w-4 h-4 ml-1" />
        </button>
      </div>

      {/* Track background */}
      {showTrack && (
        <div className="relative h-6">
          {safeTimelog.length === 0 && (
            <div className="absolute left-0 top-2 text-xs text-gray-400">
              No session activity
            </div>
          )}
          {safeTimelog.map((log, idx) => {
            if (!log || !log.start || !log.end) return null;
            const left = getPositionPercent(log.start);
            const right = 100 - getPositionPercent(log.end);
            return (
              <div
                key={`track-${idx}`}
                className="absolute h-1 bg-blue-600 rounded"
                style={{
                  left: `${left}%`,
                  right: `${right}%`,
                  top: "8px",
                  zIndex: 1,
                }}
              />
            );
          })}

          {/* Render all markers (events, join, leave) */}
          {allMarkers.length === 0 && (
            <div className="absolute left-0 top-0 text-xs text-gray-400">
              No events
            </div>
          )}
          {allMarkers.map((marker) =>
            marker.ts && !isNaN(new Date(marker.ts)) ? (
              <div
                key={marker.key}
                className="absolute"
                style={{
                  left: `calc(min(${getPositionPercent(
                    marker.ts
                  )}%, 100%) - 12px)`,

                  zIndex: 2,
                }}
              >
                {renderEventIcon(marker.type)}
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  );
}

export { ParticipantRow };
