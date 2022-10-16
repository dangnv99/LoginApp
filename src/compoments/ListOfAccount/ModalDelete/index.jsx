import React, { useCallback, useState } from "react";
import { Button, TextContainer, Modal, Frame, Toast } from "@shopify/polaris";
import { DeleteMinor } from "@shopify/polaris-icons";
import './index.scss';

const ModalDelete = ({ title, action }) => {
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = () => {
    setActive(!active)
    setLoading(false)
  };
  const handleSubmit = useCallback(() => {
    setLoading(true)
    action(() => {
      handleChange();
    });
  });

  const activator = (
    <Button id="btn-outline" onClick={handleChange} icon={DeleteMinor}></Button>
  );
  return (
    <div className="modal-delete" style={{ marginLeft: '10px' }}>   
        <Modal
          activator={activator}
          open={active}
          onClose={handleChange}
          title={title}
          secondaryActions={{
            content: "Disagree",
            onAction: handleChange,
          }}
          primaryAction={[
            {
              loading: loading,
              content: "Agree",
              onAction: handleSubmit,
              destructive: true,
              textAlign: "left",
            },
          ]}
        >
        </Modal>
    </div>
  );
};

export default ModalDelete;
