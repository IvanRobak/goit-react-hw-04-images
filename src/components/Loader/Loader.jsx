import { RotatingLines } from 'react-loader-spinner';
import { LoaderWrapper } from './Loader.styled';
export const Loader = () => {
  return (
    <LoaderWrapper>
      <RotatingLines
        strokeColor="#3f51b5"
        strokeWidth="5"
        animationDuration="0.9"
        width="96"
        visible={true}
      />
    </LoaderWrapper>
  );
};
