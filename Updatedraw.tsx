// Handle checkbox change event
const handleCheckboxChange = (tabKey: string, checkedValues: string[]) => {
  const checkedOptions = checkedValues.map((value) => {
    const checkboxOption = tabs.find((tab) => tab.key === tabKey)?.checkboxOptions.find(
      (option) => option.value === value,
    );
    return checkboxOption || { value: '', label: '' };
  });

  setSelectedCheckboxes((prevSelectedCheckboxes) =>
    prevSelectedCheckboxes.map((checkbox) =>
      checkbox.tab === tabKey ? { ...checkbox, defaultValue: checkedOptions } : checkbox,
    ),
  );
};
