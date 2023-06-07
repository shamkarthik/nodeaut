import React from 'react';
import { useForm, FormProvider, useWatch } from 'react-hook-form';
import { Drawer, Button, Checkbox, Radio } from 'antd';

interface FormData {
  [key: string]: string | string[];
}

interface Tab {
  key: string;
  title: string;
  type: 'checkbox' | 'radio';
  options: { value: string; label: string }[];
}

const DrawerContent: React.FC<{ closeDrawer: () => void; onSubmit: () => void; tabs: Tab[] }> = ({
  closeDrawer,
  onSubmit,
  tabs,
}) => {
  const methods = useForm<FormData>();
  const { control } = methods;
  const formValues = useWatch({ control });

  const renderOptions = (tab: Tab) => {
    const { type, options } = tab;
    if (type === 'checkbox') {
      return (
        <Checkbox.Group {...methods.register(tab.key)}>
          {options.map((option) => (
            <Checkbox key={option.value} value={option.value}>
              {option.label}
            </Checkbox>
          ))}
        </Checkbox.Group>
      );
    } else if (type === 'radio') {
      return (
        <Radio.Group {...methods.register(tab.key)}>
          {options.map((option) => (
            <Radio key={option.value} value={option.value}>
              {option.label}
            </Radio>
          ))}
        </Radio.Group>
      );
    }
    return null;
  };

  return (
    <Drawer onClose={closeDrawer} visible={true}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {tabs.map((tab) => (
            <div key={tab.key}>
              <label>{tab.title}</label>
              {renderOptions(tab)}
            </div>
          ))}
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </form>
      </FormProvider>
    </Drawer>
  );
};

const MyComponent: React.FC = () => {
  const [drawerVisible, setDrawerVisible] = React.useState(false);
  const methods = useForm<FormData>();

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const onSubmit = (data: FormData) => {
    // Handle form submission logic here
    console.log(data);
    closeDrawer();
  };

  const tabs = [
    {
      key: 'tab1',
      title: 'Tab 1',
      type: 'checkbox',
      options: [
        { value: 'box1', label: 'Box 1' },
        { value: 'box2', label: 'Box 2' },
      ],
    },
    {
      key: 'tab2',
      title: 'Tab 2',
      type: 'radio',
      options: [
        { value: 'radio1', label: 'Radio 1' },
        { value: 'radio2', label: 'Radio 2' },
      ],
    },
  ];

  return (
    <div>
      <Button onClick={showDrawer}>Open Drawer</Button>
      <FormProvider {...methods}>
        {drawerVisible && <DrawerContent closeDrawer={closeDrawer} onSubmit={onSubmit} tabs={tabs} />}
      </FormProvider>
    </div>
  );
};

export default MyComponent;
