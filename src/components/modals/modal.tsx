'use client';

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import Button from "./ModalInputs/Button";

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string | null;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title,
    body,
    footer,
    actionLabel,
    disabled,
    secondaryAction,
    secondaryActionLabel
}) => {
    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    const handleClose = useCallback(() => {
        if (disabled) return;
        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [disabled, onClose]);

    const handleSubmit = useCallback(() => {
        if (disabled) return;
        onSubmit();
    }, [disabled, onSubmit]);

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) return;
        secondaryAction();
    }, [disabled, secondaryAction]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            {showModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-black bg-opacity-60 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto"
                    >
                        <div className="h-full lg:h-auto md:h-auto">
                            <div className="relative flex flex-col w-full bg-gradient-to-br from-blue-500 to-blue-700 shadow-2xl rounded-2xl">
                                <div className="flex items-center p-6 rounded-t-2xl justify-center relative border-b-[1px] border-blue-400">
                                    <button
                                        onClick={handleClose}
                                        className="absolute left-4 p-2 transition-colors duration-200 rounded-full text-white hover:bg-blue-600 focus:outline-none"
                                    >
                                        <IoMdClose size={20} />
                                    </button>
                                    <h2 className="text-2xl font-bold text-white">{title}</h2>
                                </div>
                                <div className="relative p-6 bg-white rounded-b-2xl">
                                    <div className="mb-6">{body}</div>
                                    <div className="flex flex-col gap-4">
                                        <div className="flex flex-row items-center gap-4 w-full">
                                            {secondaryAction && secondaryActionLabel && (
                                                <Button
                                                    outline
                                                    disabled={disabled}
                                                    label={secondaryActionLabel}
                                                    onClick={handleSecondaryAction}
                                                />
                                            )}
                                            {actionLabel && (
                                                <Button
                                                    disabled={disabled}
                                                    label={actionLabel}
                                                    onClick={handleSubmit}
                                                />
                                            )}
                                        </div>
                                        {footer}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;

