import { Select, Input } from 'antd';
import { useEffect } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

const { Option } = Select;

interface CustomDropdownProps extends UseFormRegisterReturn {
  options: string[];
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ options, ...register }) => {
  useEffect(() => {
    register.onChange(register.name, '');
  }, [register.name, register.onChange]);

  const filterOptions = (inputValue: string, option: React.ReactElement) =>
    option.props.children?.toString().toLowerCase().includes(inputValue.toLowerCase());

  return (
    <Select
      showSearch
      filterOption={filterOptions}
      style={{ width: 200 }}
      placeholder="Select an option"
      {...register}
    >
      {options.map((option) => (
        <Option key={option} value={option}>
          {option}
        </Option>
      ))}
    </Select>
  );
};

export default CustomDropdown;
