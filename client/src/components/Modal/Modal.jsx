import React from 'react';
import Button from '../Button';
import './Modal.css'

const Modal = (props) => {
    return (
        <>

            <Button 
                caption={props.buttonCaption}
                type="button" 
                id={props.buttonId}
                class="text-center hello__home-btn" 
                data-bs-toggle="modal" 
                data-bs-target={"#"+props.modalId}
                onClick={props.btnCallback}
            />

            <div class="modal fade" id={props.modalId} tabindex="-1" role="dialog" aria-labelledby={props.modalId} aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2 class="modal-title">{props.title}</h2>
                        <button type="button" class="close modal__btn-close" data-bs-dismiss="modal" aria-label="C">
                            <span aria-hidden="true">Close</span>
                        </button>
                        </div>
                        <div class="modal-body">
                            {props.content}
                        </div>
                        <button type="button" class="btn btn-success modal__btn" data-bs-dismiss="modal">Ok</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal