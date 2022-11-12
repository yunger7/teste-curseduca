import { MantineProvider, Title } from '@mantine/core';

const App = () => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Title order={1}>Hello World!</Title>
    </MantineProvider>
  );
};

export default App;
