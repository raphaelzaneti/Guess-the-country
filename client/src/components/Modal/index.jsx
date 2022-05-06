import React from 'react';
import Button from '../Button';

const Modal = (props) => {
    return (
        <>

            <Button 
                caption={props.buttonCaption}
                type="button" 
                id="rules" 
                class="text-center btn btn-dark" 
                data-bs-toggle="modal" 
                data-bs-target="#exampleModal"
            />

            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2 class="modal-title">{props.title}</h2>
                        </div>
                        <button type="button" class="close" data-dismiss="modal" aria-label="C">
                            <span aria-hidden="true"></span>
                        </button>
                        <div class="modal-body">
                            {props.content}
                        </div>
                        <button type="button" class="btn btn-success" data-bs-dismiss="modal">Ok</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal