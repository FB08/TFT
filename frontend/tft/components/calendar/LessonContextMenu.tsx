"use client";
import {
  Menu,
  Item,
} from "react-contexify";

export default function LessonContextMenu() {
  return (
    <Menu id="lesson-menu">
      <Item
        onClick={() => {
          console.log("edit");
        }}
      >
        날짜 수정
      </Item>

      <Item
        onClick={() => {
          console.log("cancel");
        }}
      >
        수업 취소
      </Item>

      <Item
        onClick={() => {
          console.log("delay");
        }}
      >
        연기
      </Item>
    </Menu>
  );
}