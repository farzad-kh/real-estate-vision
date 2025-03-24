 
import {  Modal } from "antd";


const ModalUI = ({ handleCancel, children, open,title,footer,handleOk,confirmLoading,okType,okText,width, topStyle}) => {
  return (
    <>
      <Modal  
      style={topStyle} 
      className={open && "loading_info"}
      title={title}
        open={open}
        okText={okText}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
        cancelText="Cancel"
        okType={okType}
       footer={footer}
       wrapClassName={topStyle && "filterModal"}
       width={width}
      >
        {children}
      </Modal>
    </>
  );
};

export default ModalUI;
