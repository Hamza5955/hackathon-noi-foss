"use client";
import useStore from "@/utils/stores/main";

export default function Home() {
  const { analysis } = useStore();

  return (
    <div className="h-dvh text-center flex items-center flex-col gap-2.5 justify-center">
      <p className="text-xl font-semibold text-neutral-600">
        {analysis.length !== 0
          ? "Welcome back! to get started select one of your projects from the sidebar"
          : "Welcome, to get started create or import an analysis with the bottom right button"}
      </p>
      <span className="opacity-40">
        All projects are stored locally and won't get saved on the server.
      </span>
    </div>
  );
}
