import React from 'react'
import Modal from 'react-modal';
import { customStyles } from '../common/common';
import { useNavigate } from 'react-router-dom';

const Modals = ({modalOpen,setModalOpen,handleDeleteJournalist}) => {


const navigate = useNavigate()
  return (
    <Modal isOpen={modalOpen} style={customStyles} onRequestClose={() => setModalOpen(false)}>
    <div className="modal-content align-items-center justify-content-center p-5">
      <div className="modal-body text-center">
        <h5 className="modal-title mb-4"></h5>
        <p>Are you sure you want to block user</p>
        <div className="modal-footer mt-5 p-2">
          <button className="btn btn-secondary mx-2" onClick={() => setModalOpen(false)}>Cancel</button>
          <button className="btn btn-primary mx-2" onClick={handleDeleteJournalist}>Delete</button>
        </div>
      </div>
    </div>
  </Modal>
  )
}

export default Modals