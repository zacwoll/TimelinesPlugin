// import React
const React = BdApi.React;

interface MyComponentProps {
  disabled?: boolean;
}

export default function MyComponent({ disabled = false }: MyComponentProps) {
  const [isDisabled, setDisabled] = React.useState(disabled);

  return (
    <button className="my-component" disabled={isDisabled} onClick={() => setDisabled(!isDisabled)}>
      Hello World!
    </button>
  );
}
