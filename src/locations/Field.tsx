import React, { useEffect } from "react";
import { Stack } from "@contentful/f36-components";
import { FieldAppSDK } from "@contentful/app-sdk";
import { /* useCMA, */ useSDK } from "@contentful/react-apps-toolkit";
import { IconButton } from "@contentful/f36-components";
import FullWidth from "../components/full-width";
import ImageLeft from "../components/image-left";
import ImageRight from "../components/image-right";

const Field = () => {
  const sdk = useSDK<FieldAppSDK>();
  const options = sdk.field.validations[0].in;
  const types:Record<string, {icon: JSX.Element, label: string}> = {
    "full-width": {
      icon: <FullWidth />,
      label: "Full width",
    },
    "image-left": {
      icon: <ImageLeft />,
      label: "Image left",
    },
    "image-right": {
      icon: <ImageRight />,
      label: "Image right",
    },
  };
  const [value, setValue] = React.useState(
    sdk.field.getValue() || "full-width",
  );

  useEffect(() => {
    sdk.field.setValue(value);
  }, [value, sdk.field]);

  /*
     To use the cma, inject it as follows.
     If it is not needed, you can remove the next line.
  */
  // const cma = useCMA();
  // If you only want to extend Contentful's default editing experience
  // reuse Contentful's editor components
  // -> https://www.contentful.com/developers/docs/extensibility/field-editors/
  return (
    <Stack
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      style={{ height: "150px" }}
    >
      <Stack alignItems="center" justifyContent="center">
        {options &&
          options.map((option) => (
            <IconButton
              variant="transparent"
              aria-label={types[option].label}
              icon={types[option].icon}
              size="large"
              onClick={() => {
                setValue(option);
              }}
              isActive={value === option}
            />
          ))}
      </Stack>
    </Stack>
  );
};

export default Field;
