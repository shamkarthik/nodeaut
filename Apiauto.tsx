export const DynamicControl = ({
  inputType,
  fieldName,
  defaultValue,
  options = [],
  config = {}
}: DynamicFieldData) => {
  const { register, setValue } = useFormContext();
  const [nextFieldOptions, setNextFieldOptions] = useState([]);

  const watchedValue = useWatch({
    name: config.watchField, // Watch the specified field
    defaultValue: defaultValue // Provide a default value
  });

  useEffect(() => {
    if (config.loadOptionsFromAPI && watchedValue) {
      const apiUrl = apiUrls[config.loadOptionsFromAPI]; // Fetch URL based on key
      // Make the API call using the watchedValue
      // Update the options for the next field based on the API response
    }
  }, [watchedValue, config.loadOptionsFromAPI]);

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setValue(fieldName, selectedValue);

    if (config.setNextField) {
      const nextFieldName = config.setNextField.fieldName;
      const nextFieldValue = config.setNextField.fieldValue;
      setValue(nextFieldName, nextFieldValue);
    }
  };

  // Rest of the code remains the same
};
