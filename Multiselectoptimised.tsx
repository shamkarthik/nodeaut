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
    setSelectedValues((prevSelectedValues) => {
      if (selectAll) {
        return options;
      } else {
        return prevSelectedValues.filter((value) => options.includes(value));
      }
    });
  }, [selectAll, options]);

  const handleOptionChange = (value: T, checked: boolean) => {
    setSelectedValues((prevSelectedValues) => {
      if (checked) {
        return [...prevSelectedValues, value];
      } else {
        return prevSelectedValues.filter((v) => v !== value);
      }
    });
  };

  const handleSelectAll = () => {
    setSelectAll((prevSelectAll) => !prevSelectAll);
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
          <Checkbox
            checked={selectedValues.includes(option)}
            onChange={(e) => handleOptionChange(option, e.target.checked)}
          >
            {option}
          </Checkbox>
        </Option>
      ))}
    </Select>
  );
}

export default MultiSelectDropdown;
