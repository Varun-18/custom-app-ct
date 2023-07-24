import CheckboxInput from '@commercetools-uikit/checkbox-input';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';

const CheckBox = ({ id, setItems, items, allCheck }) => {
  const [check, setCheck] = useState(false);
  useEffect(() => {
    if (allCheck) {
      setCheck(true);
    } else {
      setCheck(false);
    }
  }, [allCheck]);
  const handleChange = (e) => {
    if (e.target.checked) {
      setItems([...items, { id }]);
      setCheck(true);
    } else {
      setItems(items.filter((item) => item.id !== id));
      setCheck(false);
    }
  };
  return (
    <CheckboxInput
      isChecked={check}
      onChange={(event) => handleChange(event)}
    />
  );
};

export default CheckBox;
