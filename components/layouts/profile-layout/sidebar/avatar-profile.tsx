"use client";

import authApi from "@/api/auth-api";
import uploadApi from "@/api/upload-api";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Author } from "@/types/user";
import useUserStore from "@/zustand/use-user-store";
import { useMutation } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { RiUpload2Fill } from "react-icons/ri";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

type Props = {};

const AvatarProfile = (props: Props) => {
    const { profile, setProfile } = useUserStore();

    const uploadImageSingleMutation = useMutation({
        mutationFn: (formData: FormData) =>
            uploadApi.uploadImageSingle(formData),
    });

    const updateProfileMutation = useMutation({
        mutationFn: (body: Author) => authApi.updateProfile(body),
    });

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        setSelectedFile(acceptedFiles[0]);
        if (contentRef.current) {
            const width = contentRef.current.clientWidth - 2;
            const height = contentRef.current.clientHeight - 2;
            const len = Math.max(width, height);
            setCrop({
                width: len,
                height: len,
                unit: "px",
                x: 0,
                y: 0,
            });
        }
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        multiple: false,
        maxFiles: 1,
    });

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [crop, setCrop] = useState<Crop>();

    const imgRef = useRef<HTMLImageElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);

    const handleUpload = async () => {
        if (profile) {
            if (!imgRef.current || !crop) return;
            const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
            const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
            const canvas = document.createElement("canvas");
            canvas.width = crop.width!;
            canvas.height = crop.height!;
            const ctx = canvas.getContext("2d")!;
            ctx.drawImage(
                imgRef.current,
                crop.x! * scaleX,
                crop.y! * scaleY,
                crop.width! * scaleX,
                crop.height! * scaleY,
                0,
                0,
                crop.width!,
                crop.height!
            );
            const base64Image = canvas.toDataURL("image/jpeg");
            const formData = new FormData();
            formData.append("image", dataURItoBlob(base64Image), "avatar.jpg");
            uploadImageSingleMutation.mutate(formData);
        }
    };

    const onCropComplete = (crop: Crop) => {
        if (crop.width && crop.height && crop.width !== crop.height) {
            const sideLength = Math.min(crop.width, crop.height);
            const newCrop = { ...crop };
            newCrop.width = sideLength;
            newCrop.height = sideLength;
            setCrop(newCrop);
        }
    };

    useEffect(() => {
        if (uploadImageSingleMutation.isSuccess) {
            profile &&
                updateProfileMutation.mutate({
                    ...profile,
                    image_url: uploadImageSingleMutation.data.data,
                });
        }
    }, [uploadImageSingleMutation.isSuccess]);

    useEffect(() => {
        if (updateProfileMutation.isSuccess) {
            setProfile(updateProfileMutation.data.data);
        }
    }, [updateProfileMutation.isSuccess]);

    const dataURItoBlob = (dataURI: string) => {
        const byteString = atob(dataURI.split(",")[1]);
        const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    };

    return (
        <Dialog modal={true}>
            <DialogTrigger asChild>
                <Avatar className="h-24 w-24 border border-border relative group">
                    <AvatarImage src={profile?.image_url} />
                    <button className="hidden absolute top-0 left-0 bottom-0 right-0 group-hover:flex items-center justify-center bg-neutral-700/70">
                        <RiUpload2Fill className="text-white text-2xl" />
                    </button>
                </Avatar>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Upload Avatar</DialogTitle>
                </DialogHeader>
                <div
                    className="max-h-[70vh] overflow-y-auto overflow-x-hidden p-[1px]"
                    ref={contentRef}
                >
                    <section className="">
                        <div
                            {...getRootProps({
                                className: "dropzone",
                            })}
                        >
                            <input {...getInputProps()} />
                            <p
                                className={cn(
                                    "w-96 h-96 border-4 border-dashed rounded-sm flex items-center justify-center mx-auto cursor-pointer",
                                    selectedFile && "hidden"
                                )}
                            >
                                Drag 'n' drop some files here, or click to
                                select files
                            </p>
                        </div>
                    </section>
                    {selectedFile && (
                        <ReactCrop
                            crop={crop}
                            onChange={(c) => setCrop(c)}
                            onComplete={onCropComplete}
                            keepSelection={true}
                            aspect={1}
                        >
                            <img
                                ref={imgRef}
                                src={URL.createObjectURL(selectedFile)}
                                width="100%"
                            />
                        </ReactCrop>
                    )}
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Cancel
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button
                            type="button"
                            onClick={handleUpload}
                            disabled={!selectedFile}
                        >
                            Done
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default AvatarProfile;
