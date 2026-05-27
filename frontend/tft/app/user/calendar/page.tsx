"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import { useRef, useState } from "react";
import { contextMenu } from "react-contexify";
import "react-contexify/ReactContexify.css";

import CalendarToolbar from "@/components/calendar/CalendarToolbar";
import LessonContextMenu from "@/components/calendar/LessonContextMenu";
import LessonModal from "@/components/calendar/LessonModal";

export type CalendarLesson = {
  title: string; // 학생 이름
  studentId: string; // 학생 ID
  start: string;
  end: string;
};

export default function CalendarPage() {
  const [events] = useState([ // 수업데이터
    {
      title: "김민수",
      studentId: "a",
      start: "2026-05-28T17:00:00",
      end: "2026-05-28T19:00:00",
    },
    {
      title: "이서연",
      studentId: "b",
      start: "2026-05-30T14:00:00",
      end: "2026-05-30T16:00:00",
    },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>();
  const [view, setView] = useState("dayGridMonth");
  const calendarRef = useRef<FullCalendar | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<CalendarLesson | null>(null);

  return (
    <div className="h-full flex flex-col gap-6">

      <CalendarToolbar 
        view={view}
        onChangeView={(nextView) => {
          setView(nextView);
          calendarRef.current?.getApi().changeView(nextView);
        }}
        onAddLesson={() => {
            setSelectedLesson(null); // 새 수업 추가
            setSelectedDate("");
            setModalOpen(true);
        }}
      />

      <div className="bg-white rounded-2xl p-4 border border-slate-200">
        <FullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin,
          ]}
          initialView={view}
          height="auto"
          events={events}
          editable={false}
          selectable={true}
          ref={calendarRef}

          eventClick={(info) => {
            setSelectedLesson({
              title: info.event.title,
              studentId: info.event.extendedProps.studentId,
              start: info.event.start?.toISOString() || "",
              end: info.event.end?.toISOString() || "",
            });
            setSelectedDate(info.event.startStr.slice(0, 10));
            setModalOpen(true);
          }}

           dateClick={(info) => {
            setSelectedLesson(null); // 새 수업 추가한다는 뜻(선택된 수업이 없으니까)
            setSelectedDate(info.dateStr);
            setModalOpen(true);
          }}

          eventDidMount={(info) => {
            info.el.addEventListener(
              "contextmenu",
              (e) => {
                e.preventDefault();

                contextMenu.show({
                  id: "lesson-menu",
                  event: e,
                  props: {
                    lessonId: info.event.id, // 수정 필요
                  },
                });
              }
            );
          }}
        />
      </div>

      <LessonContextMenu />
      <LessonModal
                open={modalOpen}
                onOpenChange={setModalOpen}
                selectedDate={selectedDate}
                lesson={selectedLesson}
              /> 
    </div>
  );
}