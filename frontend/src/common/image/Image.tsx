interface Props {
  src: string;
  alt?: string;
  onClick?: () => void;
}

export const Image = ({ src, alt, onClick }: Props) => {
  return <img src={src} alt={alt} onClick={onClick} />;
};
