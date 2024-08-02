"use client";
import useStore from "@/utils/stores/main";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();
  const { analysis } = useStore();
  const project = analysis.filter((data) => data.id === (params.id as any));

  return <p>{JSON.stringify(project)}</p>;
}
