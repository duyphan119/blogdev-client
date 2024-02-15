"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import useDialogStore from "@/zustand/use-dialog-store";

type Props = {};

const ConfirmDialog = (props: Props) => {
    const {
        title,
        visible,
        toggleVisible,
        onConfirm,
        confirmVariant,
        description,
        content,
        okText,
        cancelText,
    } = useDialogStore();

    return (
        <Dialog open={visible} onOpenChange={toggleVisible}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                {content}
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            {cancelText}
                        </Button>
                    </DialogClose>

                    <DialogClose asChild>
                        <Button
                            type="button"
                            variant={confirmVariant}
                            onClick={onConfirm}
                        >
                            {okText}
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmDialog;
