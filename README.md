# Session Timeline UI for Video and Audio Calls

This timeline displays each participant’s:

- Video and audio events (turning camera or microphone on/off with clear icons)
- Error events such as connection or media errors
- Join and leave times to show when participants entered and exited the session
- Drop-off or disconnection events to differentiate unexpected disconnections from voluntary leaves

These features provide a detailed and intuitive view of participant activity throughout the meeting.

---

## Technologies Used

- **Next.js**
- **Tailwind CSS**
- **GitHub Icons** 

---

## Folder Structure

```
src/
├── app/
│   ├── layout.js  
│   └── page.js    
├── components/
│   ├── Timeline.js
│   ├── ParticipantRow.js
│   └── TimeAxis.js
├── data/
│   └── meetingData.js
```

##  File 

- `page.js` imports and renders the `Timeline` component.
- `Timeline.js` internally uses:
  - `TimeAxis.js` to display the timeline axis.
  - `ParticipantRow.js` to render each participant’s event sequence.


## Approach Used to Create the Timeline

1. **Understanding Requirements**
   - Analyzed the provided **JSON data structure** to understand participant events, timestamps, and event types (join, leave, mute, unmute, errors, disconnects).
   - Reviewed the **Figma design file** to align spacing, colors, icons, and layout styles with the UI specifications.

2. **Component Design**
   - Created modular React components:
     - `Timeline.js` – main wrapper rendering the time axis and participant rows.
     - `TimeAxis.js` – displays time markers across the timeline for reference.
     - `ParticipantRow.js` – renders each participant’s events as icons positioned according to event time.

3. **UI Implementation**
   - First, built the UI with **hardcoded data** to match the Figma design.
   - Used **Tailwind CSS** for styling, spacing, and typography consistent with the Figma file.
   - Imported icons from GitHub Icons library for camera, mic, join, leave, etc events.

4. **Data Mapping**
   - Created a `data` folder, and under that, a `meetingData.js` file to store the provided JSON data.
   - Mapped each event onto the timeline based on its timestamp relative to the meeting start and end times.

5. **Testing and Refinement**
   - Verified alignment and event accuracy using the provided JSON dataset.
   - Matched UI spacing, icon sizes, and overall visual fidelity against the **Figma file**.

---
