import React from 'react';
import { useForm, FormProvider, useWatch, useController } from 'react-hook-form';
import { Drawer, Button, Checkbox, Radio, Tabs } from 'antd';

interface FormData {
  [key: string]: string | string[];
}

interface Tab {
  key: string;
  title: string;
  type: 'checkbox' | 'radio';
  options: { value: string; label: string }[];
}

const { TabPane } = Tabs;

interface DrawerInputProps {
  name: string;
  label: string;
  type: 'checkbox' | 'radio';
  options: { value: string; label: string }[];
  control: any;
}

const DrawerInput: React.FC<DrawerInputProps> = ({ name, label, type, options, control }) => {
  const { field } = useController({ name, control });

  if (type === 'checkbox') {
    return (
      <Checkbox.Group options={options} {...field}>
        {options.map((option) => (
          <Checkbox key={option.value} value={option.value}>
            {option.label}
          </Checkbox>
        ))}
      </Checkbox.Group>
    );
  } else if (type === 'radio') {
    return (
      <Radio.Group options={options} {...field}>
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

const DrawerContent: React.FC<{
  closeDrawer: () => void;
  onSubmit: () => void;
  tabs: Tab[];
}> = ({ closeDrawer, onSubmit, tabs }) => {
  const methods = useForm<FormData>({
    defaultValues: {
      ...tabs.reduce((acc, tab) => {
        acc[tab.key] = [];
        return acc;
      }, {}),
    },
  });
  const { control } = methods;
  const formValues = useWatch({ control });

  return (
    <Drawer onClose={closeDrawer} visible={true}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Tabs defaultActiveKey={tabs[0].key}>
            {tabs.map((tab) => (
              <TabPane tab={tab.title} key={tab.key}>
                <div>
                  <DrawerInput
                    name={tab.key}
                    label={tab.title}
                    type={tab.type}
                    options={tab.options}
                    control={control}
                  />
                </div>
              </TabPane>
            ))}
          </Tabs>
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
  const methods = useForm<FormData>({
    defaultValues: {},
  });

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
        { value: '
        <Checkbox key={option.value} value={option.value}>
          {option.label}
        </Checkbox>
      ))}
    </Checkbox.Group>
  );
} else if (type === 'radio') {
  return (
    <Radio.Group options={options} {...field}>
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

const DrawerContent: React.FC<{
  closeDrawer: () => void;
  onSubmit: () => void;
  tabs: Tab[];
}> = ({ closeDrawer, onSubmit, tabs }) => {
  const methods = useForm<FormData>({
    defaultValues: {
      ...tabs.reduce((acc, tab) => {
        acc[tab.key] = [];
        return acc;
      }, {}),
    },
  });
  const { control } = methods;
  const formValues = useWatch({ control });

  return (
    <Drawer onClose={closeDrawer} visible={true}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Tabs defaultActiveKey={tabs[0].key}>
            {tabs.map((tab) => (
              <TabPane tab={tab.title} key={tab.key}>
                <div>
                  <DrawerInput
                    name={tab.key}
                    label={tab.title}
                    type={tab.type}
                    options={tab.options}
                    control={control}
                  />
                </div>
              </TabPane>
            ))}
          </Tabs>
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
  const methods = useForm<FormData>({
    defaultValues: {},
  });

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
      <DrawerContent closeDrawer={closeDrawer} onSubmit={onSubmit} tabs={tabs} />
    </div>
  );
};

