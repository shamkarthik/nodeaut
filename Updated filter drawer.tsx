import { Drawer, Tabs, Checkbox, Row, Col } from 'antd';
import { useState, useEffect } from 'react';
import { CheckOutlined } from '@ant-design/icons';

interface CheckboxOption {
  value: string;
  label: string;
}

interface Tab {
  key: string;
  title: string;
  checkboxOptions: CheckboxOption[];
}

interface DefaultCheckbox {
  tab: string;
  defaultValue: CheckboxOption[];
}

interface FolderComponentProps {
  tabs: Tab[];
  defaultValue?: DefaultCheckbox[];
}

const FolderComponent: React.FC<FolderComponentProps> = ({ tabs, defaultValue = [] }) => {
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(tabs[0]?.key); // Active tab key
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<DefaultCheckbox[]>(
    defaultValue || [],
  ); // Array to store selected checkboxes for each tab

  // Handle tab change event
  const handleTabChange = (activeKey: string) => {
    setActiveTab(activeKey);
  };

  // Handle checkbox change event
  const handleCheckboxChange = (tabKey: string, checkedOptions: CheckboxOption[]) => {
    setSelectedCheckboxes((prevSelectedCheckboxes) =>
      prevSelectedCheckboxes.map((checkbox) =>
        checkbox.tab === tabKey ? { ...checkbox, defaultValue: checkedOptions } : checkbox,
      ),
    );
  };

  // Get the selected checkboxes for the active tab
  const getSelectedCheckboxesForTab = () => {
    const selectedTab = selectedCheckboxes.find((checkbox) => checkbox.tab === activeTab);
    return selectedTab ? selectedTab.defaultValue : [];
  };

  // Render checkbox list based on the selected tab
  const renderCheckboxList = () => {
    const activeTabOptions = tabs.find((tab) => tab.key === activeTab)?.checkboxOptions;
    const selectedTabCheckboxes = getSelectedCheckboxesForTab();
    if (activeTabOptions) {
      return activeTabOptions.map((option) => (
        <Checkbox
          key={option.value}
          value={option}
          checked={selectedTabCheckboxes.some((checkbox) => checkbox.value === option.value)}
        >
          {option.label}
        </Checkbox>
      ));
    }
    return null;
  };

  // Open the drawer
  const showDrawer = () => {
    setVisible(true);
  };

  // Close the drawer
  const onClose = () => {
    setVisible(false);
  };

  // Update selected checkboxes when default values change
  useEffect(() => {
    setSelectedCheckboxes(defaultValue || []);
  }, [defaultValue]);

  return (
    <>
      <button onClick={showDrawer}>Open Drawer</button>
      <Drawer title="Folder" visible={visible} onClose={onClose} width={600}>
        <Row gutter={16}>
          <Col span={12}>
            <Tabs activeKey={activeTab} onChange={handleTabChange}>
              {tabs.map((tab) => (
                <Tabs.TabPane key={tab.key} tab={tab.title} />
              ))}
            </Tabs>
          </Col>
          <Col span={12}>
            <Checkbox.Group
              value={getSelectedCheckboxesForTab()}
              onChange={(checkedOptions) => handleCheckboxChange(activeTab, checkedOptions)}
            >
              {renderCheckboxList()}
            </Checkbox.Group>
          </Col>
        </Row>
      </Drawer>
    </>
  );
};

export default FolderComponent;
