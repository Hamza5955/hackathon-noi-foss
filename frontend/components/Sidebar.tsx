"use client";
import useStore from "@/utils/stores/main";
import { Analysis } from "@/utils/types/Analysis";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaFileImport, FaPlus } from "react-icons/fa";

export default function Sidebar({ children }: any): React.JSX.Element {
  const router = useRouter();
  const path = usePathname();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { addAnalysis, analysis } = useStore();

  return (
    <div className="flex h-dvh">
      <div className="flex-shrink-0 bg-neutral-100 flex justify-between flex-col rounded-r-md w-[300px]">
        <div className="overflow-y-auto">
          {analysis.map((data: Analysis, i: number) => (
            <Link key={i} href={`/${data.id}`}>
              <div
                className={`flex ${
                  path == `/${data.id}` ? "bg-blue-100" : "hover:bg-blue-100"
                } flex-row  hover:cursor-pointer items-start p-2 gap-2.5 pb-4`}
              >
                <div className="rounded-md w-[80px] bg-blue-200 mt-2 h-[45px] flex-shrink-0 border-2 border-blue-500" />
                <div className="flex flex-col">
                  <span className="font-semibold">{data.name}</span>
                  <span className="opacity-45 text-sm">{data.timestamp}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="p-2">
          <Modal
            className="max-w-2xl flex justify-center items-center"
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            isDismissable={false}
            isKeyboardDismissDisabled={true}
          >
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Analyze a new image
                  </ModalHeader>
                  <ModalBody>
                    <div className="h-[250px] flex items-center gap-8">
                      <div
                        onClick={() => {
                          addAnalysis({
                            name: `Unnamed ${analysis.length + 1}`,
                          });
                          //close the modal
                          onClose();
                          router.push(`/${analysis.length + 1}`);
                        }}
                        className="h-full flex flex-col gap-6 font-semibold flex-shrink-0 transition-all cursor-pointer border-2 border-blue-500 !text-blue-500 hover:!text-white hover:bg-blue-500 rounded-md text-white flex justify-center items-center w-[250px]"
                      >
                        <FaPlus size={32} />
                        Start from scratch
                      </div>
                      <span className="opacity-50 flex-shrink-0">or</span>
                      <div className="h-full flex flex-col gap-6 font-semibold flex-shrink-0 transition-all cursor-pointer border-2 border-blue-500 !text-blue-500 hover:!text-white hover:bg-blue-500 rounded-md text-white flex justify-center items-center w-[250px]">
                        <FaFileImport size={32} />
                        Import an analysis
                      </div>
                    </div>
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
          <Button onClick={onOpen} color="primary" className="w-full">
            New analysis
          </Button>
        </div>
      </div>
      <div className="overflow-x-hidden overflow-y-auto w-full relative">{children}</div>
      {/* <div className="mt-4 flex flex-col items-center w-full">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        {uploadedImage && (
          <>
            <img src={uploadedImage} alt="Uploaded" className="mt-4 h-2/4 object-cover" />
            <Button onClick={handleUpload} color="primary" className="mt-4">
              Generete Labelling
            </Button>
          </>
        )}
      </div> */}
    </div>
  );
}
