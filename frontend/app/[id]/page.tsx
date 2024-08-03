"use client";
import useStore from "@/utils/stores/main";
import { Button } from "@nextui-org/react";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";

export default function Page() {
  const params = useParams();
  const { analysis } = useStore();
  const project: any = analysis.filter(
    (data) => data.id == (params.id as any)
  )[0];

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const inputRef: any = useRef(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e?.target?.result as string);
      };
      reader.readAsDataURL(file);
      handleUpload();
    }
  };

  const handleUpload = () => {
    if (inputRef.current.files.length > 0) {
      // Create a FormData object
      const formData = new FormData();

      // Append the file to the FormData object
      formData.append("file", inputRef.current.files[0]);
      console.log(inputRef.current.files[0]);

      // Send the file to the server using fetch
      fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json()) // Parse the response as JSON
        .then((data) => {
          setRectagles(data.processing_result[0].objects);
        })
        .catch((error) => {
          console.error("Error:", error); // Log any errors
        });
    } else {
      alert("Please select a file to upload.");
    }
  };

  const [reactangles, setRectagles] = useState<any>(null);

  if (!project?.name) {
    return <p>NOT FOUND</p>;
  }

  return (
    <>
      <div className="flex items-center justify-between p-4 absolute top-0 bg-white right-0 left-0">
        <span className="font-semibold">{project.name}</span>
      </div>
      <div className="h-dvh flex items-center justify-center flex-col bg-neutral-200">
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        {uploadedImage ? (
          <div className="h-[60%] flex items-center gap-4">
            <div className="bg-white gap-4 flex flex-col items-center justify-center rounded-xl w-[980px] shadow shadow-neutral-300 p-4">
              <div className="relative">
                {reactangles?.map((rectagle: any, i: number) => (
                  <div
                    className="absolute z-50 bg-opacity-40 border-2 border-yellow-500 bg-yellow-200"
                    key={i}
                    style={{
                      top: rectagle.start[1],
                      left: rectagle.start[0],
                      width: rectagle.end[0] - rectagle.start[0],
                      height: rectagle.end[1] - rectagle.start[1],
                    }}
                  >
                    <span className="text-yellow-200 bg-yellow-600">
                      {rectagle.type}
                    </span>
                  </div>
                ))}
                <img
                  src={uploadedImage}
                  alt="Uploaded"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="h-[60%] bg-white gap-4 flex flex-col items-center justify-center rounded-xl w-[980px] shadow shadow-neutral-300 p-4">
            <span className="text-2xl font-semibold">No image selected</span>
            <Button onClick={() => inputRef?.current?.click()}>
              Select one
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
