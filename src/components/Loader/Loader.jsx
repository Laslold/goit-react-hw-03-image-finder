import { CirclesWithBar } from 'react-loader-spinner';
import { LoaderStyle } from './Loader.styled';
function Loader() {
  return (
    <LoaderStyle>
      <CirclesWithBar
        height="100"
        width="100"
        color="#3f51b5"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        outerCircleColor=""
        innerCircleColor=""
        barColor=""
        ariaLabel="circles-with-bar-loading"
      />
    </LoaderStyle>
  );
}
export default Loader;
