"use client";
import useStore from "@/utils/stores/main";
import { useParams } from "next/navigation";

export default function Page() {
  const { analysis } = useStore();
  const params = useParams();

  return <p>TODO: finish the project page</p>
}
