import { Btn } from './Button.styled';

export const Button = ({ onClick }) => {
  return (
    <Btn type="button" onClick={onClick} className="button-load-more">
      Load more
    </Btn>
  );
};
