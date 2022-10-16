import React, { useCallback, useState } from "react";
import { Button, TextContainer, Modal, Frame, Toast } from "@shopify/polaris";
import { DeleteMinor } from "@shopify/polaris-icons";

const ModalDelete = ({ title, action }) => {
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleChange = useCallback(() => setActive(!active), [active]);
  const handleSubmit = useCallback(() => {
    setLoading(true)
    action(() => {
      setLoading(false)
      handleChange();
      toggleActive();
    });
  });


  const [activeToast, setActiveToast] = useState(false);

  const toggleActive = () => setActiveToast((activeToast) => !activeToast);

  const toastMarkup = activeToast ? (
    <Toast content="Successfull" onDismiss={toggleActive} />
  ) : null;


  const activator = (
    <Button id="btn-outline" onClick={handleChange} icon={DeleteMinor}></Button>
  );
  return (

    <div style={{ marginLeft: '10px' }}>
      <Frame>
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
        {toastMarkup}
      </Frame>
    </div>
  );
};
const mapStateToProps = (state) => ({
  reviews: state.reviews,
});

export default ModalDelete;
