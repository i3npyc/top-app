import { Htag, Button, P } from '../components';

const Home = (): JSX.Element => {
  return (
    <div>
      <Htag tag="h1">Текст</Htag>
      <Button appearance="primary" arrow='right'>Кнопка</Button>
      <Button appearance="ghost" arrow='right'>Кнопка</Button>
      <P size='big'>Текст</P>
    </div>
  );
};

export default Home;
