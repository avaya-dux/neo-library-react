import { ComponentStory } from "@storybook/react";
import { Meta } from "@storybook/react/types-6-0";
import { useState } from "react";

import { Icon } from "components/Icon";

import { Image, ImageProps } from "./Image";
import { Button } from "components/Button";

import cat from "./200by300image.jpeg";

export default {
  title: "Components/Image",
  component: Image,
} as Meta<ImageProps>;

const Template: ComponentStory<typeof Image> = ({ src, ...rest }) => {
  const [errorText, setErrorText] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [catImage, setCatImage] = useState(src);

  return (
    <section>
      <div
        style={{
          marginBottom: 20,
          paddingBottom: 20,
          borderBottom: "1px solid #ccc",
        }}
      >
        <p>Error Text: "{errorText}"</p>

        <p>
          Is Loaded: <code>{isLoaded ? "TRUE" : "FALSE"}</code>
        </p>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          height: 300,
        }}
      >
        <Image
          src={catImage}
          onError={() => setErrorText("Image could not be loaded")}
          onLoad={() => setIsLoaded(true)}
          {...rest}
        />

        <Button
          onClick={() =>
            setCatImage(
              catImage === src ? "https://placekitten.com/g/200/300" : src
            )
          }
        >
          Toggle `src`
        </Button>

        <Button onClick={() => setCatImage("broken-image.png")}>
          Break `src`
        </Button>
      </div>
    </section>
  );
};

export const DefaultImage = Template.bind({});
DefaultImage.args = {
  alt: "image of a kitten",
  className: "example-css-classname",
  fallback: "https://via.placeholder.com/200x300",
  src: cat,
  width: 200,
};

export const FallBackAsJSX = Template.bind({});
FallBackAsJSX.args = {
  alt: "broken image with Error Icon fallback",
  fallback: (
    <Icon
      aria-label="error occured"
      icon="error"
      size="lg"
      style={{ width: 200 }}
    />
  ),
  src: "brokenimage.png",
};

export const FallBackAsUrl = Template.bind({});
FallBackAsUrl.args = {
  alt: "broken image with a generic placeholder fallback",
  fallback: "https://via.placeholder.com/200x300",
  src: "brokenimage.png",
  width: 200,
};
