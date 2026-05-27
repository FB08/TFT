"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarLesson } from "@/app/user/calendar/page";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate?: string;
  lesson?: CalendarLesson | null;
};

export default function LessonModal({ open, onOpenChange, selectedDate, lesson }: Props) {
  console.log("wtf??")
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg rounded-2xl">

        <DialogHeader>
          <DialogTitle className="text-xl">
            {lesson ? "수업 기록" : "수업 추가"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-4">

          <div>
            <label className="text-sm font-medium mb-2 block">
              학생
            </label>

            <select
              className="
                w-full
                rounded-xl
                border
                border-slate-300
                px-4
                py-3
              " 
              defaultValue={lesson ? lesson.title : ""}> // 나중에 학생 데이터로 옵션 채우기
              <option>학생 선택</option> 
              <option>김민수</option>
              <option>이서연</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              날짜
            </label>

            <Input
              value={selectedDate ?? ""}
              readOnly
            />
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="text-sm font-medium mb-2 block">
                시작 시간
              </label>

              <Input type="time" defaultValue={lesson ? lesson.start.slice(11, 16) : ""}/>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">
                종료 시간
              </label>

              <Input type="time" defaultValue={lesson ? lesson.end.slice(11, 16) : ""} />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              메모
            </label>

            <textarea
              placeholder="수업 메모"
              className="
                w-full
                rounded-xl
                border
                border-slate-300
                p-4
                min-h-[120px]
                resize-none
              "
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            취소
          </Button>

          <Button>
            저장
          </Button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
}