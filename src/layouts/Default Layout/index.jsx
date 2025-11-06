import Header from './Header';
// eslint-disable-next-line react/prop-types
const DefaultLayout = ({ children }) => {
  return (
    <div className="App">
      <Header />
      <main className="main">{children}</main>
    </div>
  );
};
export default DefaultLayout;
