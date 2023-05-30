import { Select, Input } from 'antd';
import { useState } from 'react';

const { Option } = Select;

const CustomDropdown: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [visible, setVisible] = useState(false);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleVisibleChange = (visible: boolean) => {
    setVisible(visible);
  };

  const filterOptions = (inputValue: string, option: React.ReactElement) => {
    return option.props.children?.toString().toLowerCase().includes(inputValue.toLowerCase());
  };

  return (
    <Select
      showSearch
      filterOption={filterOptions}
      onSearch={handleSearch}
      optionFilterProp="children"
      dropdownVisible={visible}
      onDropdownVisibleChange={handleVisibleChange}
      style={{ width: 200 }}
      placeholder="Select an option"
      dropdownRender={(menu) => (
        <div>
          <div style={{ padding: 8 }}>
            <Input
              placeholder="Search"
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
              style={{ width: 188, marginBottom: 8, display: 'block' }}
            />
          </div>
          {menu}
        </div>
      )}
    >
      <Option value="option1">Option 1</Option>
      <Option value="option2">Option 2</Option>
      <Option value="option3">Option 3</Option>
    </Select>
  );
};

export default CustomDropdown;
