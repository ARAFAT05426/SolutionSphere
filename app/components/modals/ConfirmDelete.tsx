import React from 'react';
import BaseModal from './BaseModal';
import ActionButton from '../buttons/ActionButton';

interface ConfirmDeleteProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message?: string;
}

function ConfirmDelete({ isOpen, onClose, onConfirm, message }: ConfirmDeleteProps) {
    return (
        <BaseModal isOpen={isOpen} onClose={onClose} classname="max-w-md">
            <h2 className="text-xl font-semibold text-center mb-4">Confirm Deletion</h2>
            <p className="text-center mb-6">
                {message || 'Are you sure you want to delete this item? This action cannot be undone.'}
            </p>
            <div className="flex justify-center gap-4">
                <ActionButton onClick={onConfirm} className="bg-red-500 hover:bg-red-600">
                    Confirm
                </ActionButton>
                <ActionButton onClick={onClose} className="hover:bg-white hover:text-black">
                    Cancel
                </ActionButton>
            </div>
        </BaseModal>
    );
};

export default ConfirmDelete;
