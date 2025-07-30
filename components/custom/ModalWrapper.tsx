"use client";
import React from "react";
import { useModal } from "../context/ModalContext";
import Modal from "./Modal";

const ModalWrapper: React.FC = () => {
  const { isModalOpen, closeModal } = useModal();

  return <Modal isOpen={isModalOpen} onClose={closeModal} />;
};

export default ModalWrapper; 