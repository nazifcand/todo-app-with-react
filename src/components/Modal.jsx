import { createPortal } from "react-dom"
import classNames from "classnames";

const Modal = ({ children, open, title, onClose, size = 'medium' }) => {

  if (!open) return;

  const onClickHandler = event => {
    const { id } = event.target;
    if (id == 'modal-wrapper') onClose()
  }

  const template = <>
    <div className="overlay"></div>

    <div id="modal-wrapper" onClick={(e) => onClickHandler(e)}>
      <div id="modal" className={classNames({
        [`modal--${size}`]: true
      })}>

        <div id="modal-header">
          <div className="modal-title">{title}</div>
          <div className="modal-close" onClick={() => onClose()}>
            <i className="far fa-times"></i>
          </div>
        </div>

        <div id="modal-content">
          {children}
        </div>

      </div>
    </div>
  </>

  return createPortal(template, document.getElementById('modal-root'))
}

export default Modal