"use client";
import { Button } from "@/components/ui/button";

type Props = {
  view: string;
  onChangeView: (view: string) => void;
  onAddLesson: () => void;
};

export default function CalendarToolbar( {view, onChangeView, onAddLesson }: Props) {
  return (
    <div className="flex items-center justify-between">

      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          캘린더
        </h1>

        <p className="text-sm text-slate-500">
          수업 일정을 관리하세요
        </p>
      </div>
      <Button
        variant={view === "dayGridMonth" ? "default" : "outline"}
        onClick={() => onChangeView("dayGridMonth")}
      >
        월
      </Button>

      <Button
        variant={view === "timeGridWeek" ? "default" : "outline"}
        onClick={() => onChangeView("timeGridWeek")}
      >
        주
      </Button>

      <Button
        variant={view === "timeGridDay" ? "default" : "outline"}
        onClick={() => onChangeView("timeGridDay")}
      >
        일
      </Button>
      <Button className="rounded-xl" onClick={onAddLesson}>
        + 수업 추가
      </Button>
    </div>
  );
}