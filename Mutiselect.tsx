import { Select, Checkbox, Button } from 'antd';
import { useEffect, useState } from 'react';

const { Option } = Select;

interface MultiSelectDropdownProps<T> {
  options: T[];
  onChange: (values: T[]) => void;
}

function MultiSelectDropdown<T>({ options, onChange }: MultiSelectDropdownProps<T>) {
  const [selectedValues, setSelectedValues] = useState<T[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    if (selectAll) {
      setSelectedValues(options);
    } else {
      setSelectedValues([]);
    }
  }, [selectAll, options]);

  const handleOptionChange = (value: T, checked: boolean) => {
    if (checked) {
      setSelectedValues((prevSelectedValues) => [...prevSelectedValues, value]);
    } else {
      setSelectedValues((prevSelectedValues) =>
        prevSelectedValues.filter((val) => val !== value)
      );
    }
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  const handleDropdownVisibleChange = (open: boolean) => {
    if (!open) {
      setSelectAll(false);
    }
  };

  const dropdownRender = (menu: React.ReactNode) => (
    <div>
      <div style={{ padding: '8px', display: 'flex', justifyContent: 'space-between' }}>
        <Checkbox onChange={handleSelectAll} checked={selectAll}>
          Select All
        </Checkbox>
        <Button type="link" size="small" onClick={() => setSelectedValues([])}>
          Clear
        </Button>
      </div>
      {menu}
    </div>
  );

  return (
    <Select
      mode="multiple"
      showArrow
      optionLabelProp="label"
      value={selectedValues}
      onChange={(values: T[]) => {
        setSelectedValues(values);
        onChange(values);
      }}
      onDropdownVisibleChange={handleDropdownVisibleChange}
      dropdownRender={dropdownRender}
      style={{ width: '100%' }}
    >
      {options.map((option) => (
        <Option key={option} value={option} label={option.toString()}>
          <Checkbox checked={selectedValues.includes(option)} onChange={(e) => handleOptionChange(option, e.target.checked)}>
            {option}
          </Checkbox>
        </Option>
      ))}
    </Select>
  );
}

export default MultiSelectDropdown;
