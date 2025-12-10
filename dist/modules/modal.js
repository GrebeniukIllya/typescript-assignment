"use strict";
// src/modules/modal.ts
// Provides functions to control a modal dialog and initialise event handlers.
Object.defineProperty(exports, "__esModule", { value: true });
exports.openModal = openModal;
exports.closeModal = closeModal;
exports.initModal = initModal;
/**
 * Opens the modal by setting its display style to 'block'.
 *
 * @param modal - The modal element to show
 */
function openModal(modal) {
    modal.style.display = 'block';
}
/**
 * Closes the modal by hiding it (setting display to 'none').
 *
 * @param modal - The modal element to hide
 */
function closeModal(modal) {
    modal.style.display = 'none';
}
/**
 * Sets up event listeners to handle opening and closing a modal. The modal will
 * open when the openButton is clicked, close when the closeButton is clicked
 * and also close when the user clicks outside of the modal content.
 *
 * @param modal - The modal overlay element
 * @param openButton - The element which, when clicked, should open the modal
 * @param closeButton - The element inside the modal that closes it (e.g., a span with '×')
 */
function initModal(modal, openButton, closeButton) {
    // Show the modal on button click
    openButton.addEventListener('click', () => openModal(modal));
    // Close when clicking the close icon
    closeButton.addEventListener('click', () => closeModal(modal));
    // Close modal when clicking outside the modal content (i.e., the overlay itself)
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal(modal);
        }
    });
}
