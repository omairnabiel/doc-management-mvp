export const Modal = ({ title, body, onClose, onConfirm }) => {
  return (
    <div className="modal fade" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>{body}</p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
              onClick={onClose}
            >
              Close
            </button>
            <button type="button" class="btn btn-primary" onClick={onConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
